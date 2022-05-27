import requests
from bs4 import BeautifulSoup


def remove_brackets_and_parentheses(test_str):
    """
    Removes brackets, parentheses, and text embedded in them.

    Code copied from:
    https://stackoverflow.com/questions/14596884/remove-text-between-and
    April 28, 2022
    """

    ret = ''
    skip1c = 0
    skip2c = 0
    for i in test_str:
        if i == '[':
            skip1c += 1
        elif i == '(':
            skip2c += 1
        elif i == ']' and skip1c > 0:
            skip1c -= 1
        elif i == ')'and skip2c > 0:
            skip2c -= 1
        elif skip1c == 0 and skip2c == 0:
            ret += i
    return ret


def scrape(url):
    """Performs a web scrape on the given URL.
    Outputs contents to 'output.txt' file in same directory."""

    # Sets URL to be Web Scraped
    url = url
    html = requests.get(url)

    # Creates a new instance of the Beautiful Soup library
    soup = BeautifulSoup(html.text, 'lxml')

    # Find all html objects of a specific tag
    tags = soup.find('div', class_='mw-body-content mw-content-ltr')

    # Find all specific tags in those html objects
    p_tags = tags.find_all('p')

    # Open 'output.txt' file to write to and delete all existing contents
    file = open('output.txt', 'w', encoding="utf-8")
    file.truncate(0)

    # Iterate through the paragraph tags and grab the text from them
    for el in p_tags:
        text = el.get_text()

        # Eliminate brackets, parentheses, and text between them to clean it up
        text = remove_brackets_and_parentheses(text)

        # Write text to 'output.txt'
        file.write(f"{text}\n")

    # Close file
    file.close()


while True:
    ready_check = open('ready_check.txt', 'r+', encoding="cp437")
    contents = ready_check.read()

    if contents == "ready":
        print("Ready for web scrape")

        # Performs a web scrape on the passed url
        url_file = open('wiki_url.txt', 'r+', encoding="cp437")
        url = url_file.read()
        url_file.truncate(0)
        url_file.close()
        print(f"URL scraped: {url}")
        scrape(url)
        ready_check.truncate(0)
        ready_check.close()

    else:
        ready_check.close()
