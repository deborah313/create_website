FROM nginx:latest 


COPY . /usr/chare/nginx/html

# The image file is the recipe (image file)
# These are the instructions, the ones that we wrote above ^


# ... in terminal ... 
# docker build -t maaz-website .
# run -d --name maaz-webs -p 8080:80 maaz-website
# docker ps (tells you how many containers are running)
# we can go to folder and open terminal and type in [code .] it will open code in IDE
# we can type in [stop maaz-webs (or name)] it will stop the running container
# -d means that it deattched the command prompt?? idk man


# after this, the node on our localhost site should change to the one in the nginx server
# 