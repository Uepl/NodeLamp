FROM php:apache
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN mkdir -p /etc/apache2/logs/
RUN chown www-data:www-data /etc/apache2/logs/
RUN chmod 755 /etc/apache2/logs/
# คัดลอกไฟล์ config Apache
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# เปิด mod_rewrite สำหรับ Apache
RUN a2enmod rewrite proxy proxy_http authz_core




# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /var/www/html

EXPOSE 80

# เปิดใช้งาน PHP
CMD ["apache2-foreground"]