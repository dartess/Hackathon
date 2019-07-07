import requests
from bs4 import BeautifulSoup as bs
import xlwt

#https://yaroslavl.hh.ru

def hh_parse(max_pages):
    book = xlwt.Workbook(encoding="utf-8")
    sheet = book.add_sheet("First_DB")
    row = 1
    column = 1
    page = 0

    headers = {'accept': '*/*',
               'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'}

    while page <= max_pages:
        base_url = 'https://kostroma.hh.ru/search/resume?area=52&clusters=true&exp_period=all_time&logic=normal&no_magic=false&order_by=relevance&pos=full_text&text=&page=' + str(page)
        print(base_url)
        print("\n", page, "СТРАНИЦА: \n")
        session = requests.session()
        request = session.get(base_url, headers=headers)

        if request.status_code == 200:
            soup = bs(request.content, 'html.parser')
            divs = soup.find_all('div', attrs={'data-qa': 'resume-serp__resume'})
            for div in divs:
                href = 'https://kostroma.hh.ru' + div.find('a', attrs={'data-qa': 'resume-serp__resume-title'})['href']
                new_ses = requests.session()
                d = new_ses.get(href, headers=headers)
                parse = bs(d.content, 'html.parser')
                try:
                    title = parse.find('span', attrs={'data-qa': 'resume-block-title-position'}).text
                    general = parse.find('div', attrs={'class': 'resume-header-block'})
                    gender = general.contents[0].contents[0].text
                    age = general.contents[0]
                    if len(general.contents[0]) <= 1:
                        age = ""
                    else:
                        age = age.contents[2].text

                    ready_to_leave = str(general.contents[1].contents[0].contents[3])
                    if ready_to_leave.find('не') != -1:
                        ready_to_leave = 'нет'
                    else:
                        ready_to_leave = 'да'

                    experience = parse.find('div', attrs={'data-qa': 'resume-block-experience'})
                    if experience is None:
                        experience = ""
                    else:
                        experience = experience.contents[0].text[12:]

                    salary = parse.find('span', attrs={'data-qa': 'resume-block-salary'})
                    if salary is None:
                        salary = ""
                    else:
                        salary = salary.text

                    compet = ''
                    skills = parse.findAll('div', attrs={'data-qa': 'bloko-tag bloko-tag_inline'})
                    for i in skills:
                        compet += i.text + ', '

                    educ = ""
                    education = parse.findAll('div', attrs={'data-qa': 'resume-block-education-name'})
                    for i in education:
                        educ += i.text + ', '


                    data_for_excel = [title, gender, age, ready_to_leave, experience, salary, compet[:len(compet) - 2], educ[:len(educ) - 2]]

                    # print(data)
                    for part in data_for_excel:
                        sheet.write(row, column, part)
                        column += 1

                    column = 1
                    row += 1
                except UnicodeEncodeError:
                    print('Ошибка кодировки')
                except AttributeError:
                    print('Неверные данные')
        else:
            print('ERROR')

        page += 1

    book.save("hhRu.xls")


max_pages = 249
hh_parse(1)
