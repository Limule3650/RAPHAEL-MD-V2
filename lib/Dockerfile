FROM quay.io/CrazyPrince/crazymd
RUN git clone https://github.com/Alp24ni/SASAKI-MD /root/sasaki-md
WORKDIR /root/sasaki-md/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
