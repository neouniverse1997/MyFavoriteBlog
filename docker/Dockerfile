# install node version
FROM node:lts-alpine

# working dir
WORKDIR /usr/src/app

# install vue-cli
RUN apk update && \
    npm install && \
    npm install -g npm && \
    npm install -g @vue/cli


CMD ["/bin/sh"]
