FROM quay.io/CrazyPrince/crazymd
RUN git clone https://github.com/Limule3650/RAPHAEL-MD-V2/root/raphael-md-v2
WORKDIR /root/raphael-md-v2/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
