# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /nextjs-ui && mv ./node_modules ./nextjs-ui

WORKDIR /nextjs-ui

COPY . .

# Build the project and copy the files
RUN npm run build


# # 2nd Stage nginx
# FROM nginx:alpine

# COPY default.conf /etc/nginx/conf.d

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /nextjs-ui/.next /usr/share/nginx/html

# WORKDIR /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]