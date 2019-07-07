import xlrd
import pymorphy2
import re
import numpy as np


dict_word = []

with open("wordDict.txt") as file_handler:
    for line in file_handler:
        dict_word.append(line)


def AnalyText(text_list: str):
    result = []
    word_dict = {}
    obshc_word = []
    N = 0
    morph = pymorphy2.MorphAnalyzer()
    word_in_str = []


    for line in text_list:
        d = re.split('\W+', line.lower())
        for w in d:
            if len(w) > 2:
                asd = morph.parse(w)[0].normal_form
                word_dict[asd] = word_dict.get(asd, 0) + 1
                word_in_str.append(asd)
                N += 1
        result.append(list(word_in_str))
        word_in_str.clear()

    # формирование списка слов, которые встречаются в тексте наиболее часто
    for key, value in word_dict.items():
        if value * 1000 / N > 8:
            obshc_word.append(key)

    return result, obshc_word

def read(path):
    book = xlrd.open_workbook(path, formatting_info=True)
    sheet = book.sheet_by_index(0)
    num_rows = sheet.nrows
    num_col = sheet.ncols
    print(num_rows)

    for i in range(num_rows):
        data = ''
        for j in range(num_col):
            data += sheet.cell(i, j).value
        # print(data)
        # print('\n')

    # получаем список значенний из всех записей
    vals = [sheet.row_values(rownum) for rownum in range(sheet.nrows)]
    arr =np.array(vals)

    list_results = []
    word = []

    for i in range(7):
        result, word = AnalyText(arr[:, i])
        list_results.append(result)
        word.append(word)


    print(result)
    print('\n')
    print(word)

    # for i in range(len(vals)):
    #     for j in range(len(vals[i])):
    #         print(vals[i][1])

    #print(vals)

if __name__ == '__main__':
    read('hhRuJobs.xls')
