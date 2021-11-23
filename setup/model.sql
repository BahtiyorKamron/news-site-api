create table users(
  user_id int generated always as identity primary key,
  first_name varchar(32) not null,
  last_name varchar(32) not null,
  email varchar(32) not null,
  password varchar(32) not null,
  specialist varchar(32) not null
);
alter table users add column specialist varchar(32) not null;
create table languages(
  lang_id int generated always as identity primary key,
  lang_name varchar(32)
);

create table categories(
  categor_id int generated always as identity primary key,
  categor_name varchar(56),
  categor_lang_id int not null references languages(lang_id) on delete cascade
);

create table news(
  news_id serial not null,
  news_title varchar(256),
  news_body text,
  news_created_time timestamptz default current_timestamp,
  news_views int ,
  author_id int not null references users(user_id) on delete cascade,
  categor_id int not null references categories(categor_id) on delete cascade,
  news_lang_id int not null references languages(lang_id) on delete cascade
);

insert into news(news_title,news_body,news_views,author_id,categor_id,news_lang_id)
  values('Boksda yutdi','<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <h1>hello</h1>
    </body>
  </html>',3,6,5,1)


insert into languages(lang_name) values('eng'),('uz'),('rus');

insert into users(first_name,last_name,email,password,specialist)
  values('Kimdir','Kimdirov','nimadir@gmail.com','nimadir1!@2','bekorchi');

insert into categories(categor_name,categor_lang_id)
  values
        ('Sport habarlari',2),
        ('Talim habarlari',2),
        ('Foreign news',1),
        ('Sport news',1),
        ('Novosti',3),
        ('vremen',3);

insert into news(news_title,news_body,news_views,author_id,categor_id,news_lang_id)
  values('Первостепенная задача»: почему в Пентагоне заговорили о необходимости расширять военные контакты с Россией','<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <h1>hello</h1>
    </body>
  </html>',1,6,1,3);


values('Kimdir','Kimdirov','nimadir@gmail.com','nimadir1!@2','bekorchi');
  with old as (
    select
           email
    from users
    where user_id=1
  )insert into users(first_name,last_name,email,password,specialist)
  values(
    'kamron',
    'bahtiyorov',
    (case
          when old.email <> 'nimadir@gmail.com' then "what"
          else null
    end),
    'asdf454',
    'olim'
  )from old  where user_id=1
  returning *;


select * from categories
natural join languages where categories.categor_lang_id=languages.lang_id






WITH old_data as (
SELECT
categor_id,
categor_name,
categor_lang_id
FROM categories
WHERE categor_id = 1
) UPDATE categories c SET
categor_name = (
CASE
WHEN length('asdfasdf') > 1 THEN 'asdfasdf'
ELSE o.categor_name
END)
FROM old_data o
WHERE c.categor_id = 1
RETURNING *





WITH old_data as (
SELECT
news_id,
news_title,
news_body,
author_id
FROM news
WHERE news_id = $1
) UPDATE news c SET
news_title = (
CASE
WHEN length('kamron') > 1 THEN 'kmaron'
ELSE o.news_title
END),
news_body=(
  case
  when length($3)>1 THEN $3
  else o.news_body
),
author_id=(
  case
  when $4>0 THEN $4
  else o.author_id
)
FROM old_data o
WHERE c.news_id = $1
RETURNING *;





select
     *
from news
natural join languages
where
news_lang_id=(
  case
  when 3>0 then 3
  else true
  end
)and
author_id=(
  case
  when 8>0 THEN 8
  else true
  end
)


SELECT news_title,
FILTER (WHERE news_id < 6 ) AS with_filter
FROM news
group by news_title;







insert into users(first_name, last_name, email, password, specialist ) values
('Javokhir','Tursunov','javokhir580@gmail.com','aaa2262716','bacholar degre'),
('Suxrob','Murodullayev','suxrob600@gmail.com','aaa9154006','master degre');
