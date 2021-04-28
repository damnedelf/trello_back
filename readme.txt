./node_modules/.bin/sequelize-cli init
rename config/config.json to config/config.js and update the code //TEMPLATE
./node_modules/.bin/sequelize-cli model:generate --name Users --attributes name:string,email:string  
./node_modules/.bin/sequelize-cli model:generate --name Boards --attributes name:string,ownerId:integer,userId:array:integer 
./node_modules/.bin/sequelize-cli model:generate --name Tables --attributes name:string,boardId:integer,order:decimal
./node_modules/.bin/sequelize-cli model:generate --name Tasks --attributes title:string,text:string,story:string,tableId:integer,creatorId:integer,assignedUsers:array:integer,priority:decimal
