# CinemaPress CMS

[![Join the chat at https://gitter.im/CinemaPress/CinemaPress-CMS](https://badges.gitter.im/CinemaPress/CinemaPress-CMS.svg)](https://gitter.im/CinemaPress/CinemaPress-CMS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
 :movie_camera: Система управления самообновляемым кино-сайтом.
 
# CinemaPress DataBase
 :minidisc: База данных ~ 500 000 фильмов (все фильмы/сериалы планеты).

## Установка:
Работает на Debian 7,8 (64-bit)
```
wget https://git.io/v2XAV -qO install.sh
sh install.sh [domain] [theme]
```

##### Пример:
```
~# sh install.sh mydomain.com barney

---------------------- DOMAIN URL --------------------------------
mydomain.com
------------------------ THEME -----------------------------------
barney
------------------------------------------------------------------
```

### Установка темы оформления

- [Barney (kinogo.cc)](https://github.com/CinemaPress/Theme-Barney)
```
sh theme.sh barney
```
<a href="https://github.com/CinemaPress/Theme-Barney"><img src="https://raw.githubusercontent.com/CinemaPress/Theme-Barney/master/screenshot.jpg" width="400"></a>
---
- [Ted (kinogb.net)](https://github.com/CinemaPress/Theme-Ted)
```
sh theme.sh ted
```
<a href="https://github.com/CinemaPress/Theme-Ted"><img src="https://raw.githubusercontent.com/CinemaPress/Theme-Ted/master/screenshot.jpg" width="400"></a>
---
- [Lily (kinokong.net)](https://github.com/CinemaPress/Theme-Lily)
```
sh theme.sh lily
```
<a href="https://github.com/CinemaPress/Theme-Lily"><img src="https://raw.githubusercontent.com/CinemaPress/Theme-Lily/master/screenshot.jpg" width="400"></a>
---
- [Marshall (zerx.cc)](https://github.com/CinemaPress/Theme-Marshall)
```
sh theme.sh marshall
```
<a href="https://github.com/CinemaPress/Theme-Marshall"><img src="https://raw.githubusercontent.com/CinemaPress/Theme-Marshall/master/screenshot.jpg" width="400"></a>

## Конфигурация
Файл конфигурации находится *config/config.js*

- **domain** - домен Вашего сайта (example.com);
- **email** - email для связи, отображается на сайте;
- **disqus** - имя пользователя на disqus.com для отображения формы комментариев (films-online);
- **theme** - название темы оформления (ted);
- **top** - массив из ID КиноПоиск фильмов, которые будут отображаться в "карусели" фильмов вверху страницы (299, 300, 301);
- **abuse** - массив из ID КиноПоиск фильмов, на которые поступили жалобы от правообладателей и онлайн просмотр и скачивание нужно ограничить;
- **social**
    - **vk** - URL паблика ВК;
    - **facebook** - URL группы facebook;
    - **twitter** - URL страницы twitter;
- **cache** - время хранения кэша в секундах (60\*60\*24);
- **counts**
    - **index** - число фильмов на главной странице в каждой категории (20);
    - **category** - число фильмов в категориях (30);
    - **top_category** - число топовых фильмов в категориях (10);
    - **related** - число связанных фильмов в каждой категории на странице фильма (5);
    - **sitemap** - число фильмов в карте сайта в каждом году (10000);
- **related** - категории связанных фильмов (countries,genres,directors,actors,country,genre,director,actor,year);
- **titles**
    - **index** - название сайта;
    - **year** - назвние на странице фильмов в году;
    - **years** - назвние на странице всех годов;
    - **genre** - назвние на странице фильмов в жанре;
    - **genres** - назвние на странице всех жанров;
    - **country** - назвние на странице фильмов из страны;
    - **countries** - назвние на странице всех стран;
    - **actor** - назвние на странице фильмов актера;
    - **actors** - назвние на странице всех актеров;
    - **director** - назвние на странице фильмов режиссера;
    - **directors** - назвние на странице всех режиссеров;
    - **type** - название на странице типа;
    - **search** - название на странице поиска фильма;
    - **num** - добавляется к названию при переходе по страницам;
    - **movie**
        - **single** - название на странице фильма;
        - **online** - название на странице с просмотром фильма;
        - **download** - название на странице с возможностью скачать фильм;
        - **trailer** - название на странице с трейлером фильма;
        - **picture** - название на странице с кадрами из фильма;
    - **related**
        - **year** - отображается назвние категории связанных фильмов по году;
        - **genre** - отображается назвние категории связанных фильмов по жанру;
        - **country** - отображается назвние категории связанных фильмов по стране;
        - **actor** - отображается назвние категории связанных фильмов по актерам;
        - **director** - отображается назвние категории связанных фильмов по режиссерам;
    - **sort** - добавляется к названию при переходе по сотрировкам;
- **descriptions**
    - **index** - описание сайта;
    - **year** - описание на странице фильмов в году;
    - **years** - описание на странице всех годов;
    - **genre** - описание на странице фильмов в жанре;
    - **genres** - описание на странице всех жанров;
    - **country** - описание на странице фильмов из страны;
    - **countries** - описание на странице всех стран;
    - **actor** - описание на странице фильмов актера;
    - **actors** - описание на странице всех актеров;
    - **director** - описание на странице фильмов режиссера;
    - **directors** - описание на странице всех режиссеров;
    - **type** - описание на странице типа;
    - **search** - описание на странице поиска фильма;
    - **movie**
        - **single** - описание на странице фильма;
        - **online** - описание на странице с просмотром фильма;
        - **download** - описание на странице с возможностью скачать фильм;
        - **trailer** - описание на странице с трейлером фильма;
        - **picture** - описание на странице с кадрами из фильма;
- **keywords**
    - **index** - ключевые слова сайта;
    - **year** - ключевые слова на странице фильмов в году;
    - **years** - ключевые слова на странице всех годов;
    - **genre** - ключевые слова на странице фильмов в жанре;
    - **genres** - ключевые слова на странице всех жанров;
    - **country** - ключевые слова на странице фильмов из страны;
    - **countries** - ключевые слова на странице всех стран;
    - **actor** - ключевые слова на странице фильмов актера;
    - **actors** - ключевые слова на странице всех актеров;
    - **director** - ключевые слова на странице фильмов режиссера;
    - **directors** - ключевые слова на странице всех режиссеров;
    - **type** - ключевые слова на странице типа;
    - **search** - ключевые слова на странице поиска фильма;
    - **movie**
        - **single** - ключевые слова на странице фильма;
        - **online** - ключевые слова на странице с просмотром фильма;
        - **download** - ключевые слова на странице с возможностью скачать фильм;
        - **trailer** - ключевые слова на странице с трейлером фильма;
        - **picture** - ключевые слова на странице с кадрами из фильма;  
- **sorting**
    - **kinopoisk-rating-up** - отображение ссылки (кнопки) сортировки по рейтингу КиноПоиск (убывание);
    - **kinopoisk-rating-down** - отображение ссылки (кнопки) сортировки по рейтингу КиноПоиск (возрастание);
    - **imdb-rating-up** - отображение ссылки (кнопки) сортировки по рейтингу IMDb (убывание);
    - **imdb-rating-down** - отображение ссылки (кнопки) сортировки по рейтингу IMDb (возрастание);
    - **kinopoisk-vote-up** - отображение ссылки (кнопки) сортировки по числу голосов КиноПоиск (убывание);
    - **kinopoisk-vote-down** - отображение ссылки (кнопки) сортировки по числу голосов КиноПоиск (возрастание);
    - **imdb-vote-up** - отображение ссылки (кнопки) сортировки по числу голосов IMDb (убывание);
    - **imdb-vote-down** - отображение ссылки (кнопки) сортировки по числу голосов IMDb (возрастание); 
    - **year-up** - отображение ссылки (кнопки) сортировки по годам (убывание);
    - **year-down** - отображение ссылки (кнопки) сортировки по годам (возрастание);
    - **premiere-up** - отображение ссылки (кнопки) сортировки по премьерам (убывание);
    - **premiere-down** - отображение ссылки (кнопки) сортировки по премьерам (возрастание);
    - **default** - сортировка по умолчанию для всех категорий;
- **urls**
    - **prefix_id** - префикс стоящий перед ID фильма в URL;
    - **separator** - разделитель в URL странице фильма;
    - **movie_url** - URL страницы фильма;
    - **movie** - URL страницы фильма перед разделителем;
    - **year** - URL страницы годов перед разделителем;
    - **genre** - URL страницы жанра перед разделителем;
    - **country** - URL страницы страны перед разделителем;
    - **actor** - URL страницы актера перед разделителем;
    - **director** - URL страницы режиссера перед разделителем;
    - **type** - URL страницы типа перед разделителем;
    - **search** - URL страницы поиска перед разделителем;
    - **sitemap** - URL страницы карты сайта;

## Особенности заполнения конфигурации

#### Синонимация

**titles**, **descriptions**, **keywords** могут иметь несколько вариантов отображения на разных страницах. Для этого нужно составлять текст через "синонимацию", например:

- **titles**
    - **movie**
        - **single** = "\[Смотреть онлайн|Онлайн просмотр|Фильм смотреть|Онлайн\] \[title_ru\] \[бесплатно|без регистрации|без смс\]"
    
Таким образом разные люди которые заходят на страницу фильма Аватар увидят различные названия страницы (генерирование происходит случайным образом):

- Онлайн Аватар бесплатно
- Смотреть онлайн Аватар без регистрации
- Онлайн просмотр Аватар без регистрации
- и т.д.

#### Составление URL фильмов

- **urls**
    - **movie_url** = "\[prefix_id\]\[separator\]\[title_ru\]\[separator\]\[title_en\]"

Поля, которые можно использовать в URL:

- **prefix_id** - обязательное поле содержащее ID фильма;
- **separator** - разделитель между полями. Требуется для того, чтобы при отсутствии одного из полей (title_ru, title_en, ...) не было повторений разделителей в URL "/id298--Avatar" или "/id298-Аватар-";
- **title_ru** - русское название фильма;
- **title_en** - оригинальное название фильма;
- **year** - год фильма;
- **country** - название одной из стран'
- **genre** - название одного из жанров;
- **director** - имя и фамилия режиссера;
- **actor** - имя и фамилия актера;