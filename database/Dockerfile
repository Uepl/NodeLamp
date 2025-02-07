FROM php:apache
RUN docker-php-ext-install mysqli pdo pdo_mysql

# คัดลอกไฟล์ config Apache
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# เปิด mod_rewrite สำหรับ Apache
RUN a2enmod rewrite

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /var/www/html

EXPOSE 80

# เปิดใช้งาน PHP
CMD ["apache2-foreground"]