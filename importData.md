# Importing data to mongodb
mongoimport --db <DBNAME> --collection <COLLECTIONNAME> --drop --file <FILENAME>


```
> mongoimport --db test2 --collection users --drop --file .\users_list.json
2018-03-04T21:50:49.498+0100    connected to: localhost
2018-03-04T21:50:49.980+0100    dropping: test2.users
2018-03-04T21:50:51.172+0100    [########################] test2.users  23.6KB/23.6KB (100.0%)
2018-03-04T21:50:51.385+0100    [########################] test2.users  23.6KB/23.6KB (100.0%
)2018-03-04T21:50:51.385+0100    imported 30 documentsPS 
>
```
