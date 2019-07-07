import requests
from bs4 import BeautifulSoup as bs
import xlwt


headers = {'accept': '*/*', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                                          '(KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'}

url = "https://kostroma.hh.ru/vacancy/26386265"

#fields
#title  data-qa="vacancy-title"
#cost   class=vacancy-salary


def parserJobsHH(base_url, start_page, max_page, count_thread):
    print("Start")
    print("Load for ", base_url, "max-page:", max_page)
    book = xlwt.Workbook(encoding="utf-8")
    sheet = book.add_sheet("Jobs")
    row = 1
    column = 1
    page = start_page

    while page < max_page:
        page_str = '&text=&page=' + str(page)
        req = requests.get(base_url + page_str, headers=headers)

        if req.status_code != 200:
            print('ERROR: status_code != 200')
            continue

        soup = bs(req.content, 'html.parser')
        a_jobs = soup.find_all('a', attrs={'data-qa': 'vacancy-serp__vacancy-title'})

        for a_job in a_jobs:
            try:
                href = a_job.get('href')
                new_session = requests.session()
                d = new_session.get(href, headers=headers)
                job_page = bs(d.content, 'html.parser')

                div_vacancy_title = job_page.find('div', attrs={'class': 'vacancy-title'})
                title = div_vacancy_title.find('h1').text  # заголовок
                salary = div_vacancy_title.find('p').text   # з/п

                experience = job_page.find('span', attrs={'data-qa': 'vacancy-experience'}).text    # треб. опыт
                work_house = job_page.find('span', attrs={'itemprop': 'workHours'}).text            # рабоч время

                div_vacancy_description = job_page.find('div', attrs={'data-qa': 'vacancy-description'})
                ul_vacancy_description = div_vacancy_description.find_all('ul')

                duties = ''        # обязанности
                requirements = ''  # требования

                flag = True
                for li in ul_vacancy_description:
                    if (flag):
                        for dutie in li.find_all('li'):
                            duties += dutie.text  # + ';'
                        flag = False
                    else:
                        for requirement in li.find_all('li'):
                            requirements += requirement.text  # + ';'

                data_for_excel = [title, salary, experience, work_house,
                                  duties[:len(duties) - 2], requirements[:len(requirements) - 2]]

                # print(data)
                for part in data_for_excel:
                    sheet.write(row, column, part)
                    column += 1
            except UnicodeEncodeError:
                print('Ошибка кодировки')
                print("Page: ", page)
                print("Column: " + column, "Row: " + row)
            except AttributeError:
                print('Неверные данные')
                print("Page: ", page)
                print("Column: " + column, "Row: " + row)
            column = 1
            row += 1
        page += 1
        print("Page: ", page)
    book.save("hhRu.xls")


if __name__ == '__main__':
    base_url = "https://kostroma.hh.ru/search/vacancy?text=&specialization=18&area=1771&salary=&currency" \
               "_code=RUR&experience=doesNotMatter&order_by=relevance&search_period=&items_on_page=20&no_magic=true"
        #"https://yaroslavl.hh.ru/search/vacancy?area=112&clusters=true" \
        #       "&enable_snippets=true&specialization=1&from=cluster_professionalArea"
    parserJobsHH(base_url, 1, 30, 1)


