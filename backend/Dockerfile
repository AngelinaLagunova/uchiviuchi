FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Выполняем миграции и собираем статику, если нужно
# FOR Django static files, настроенного для сервера
# RUN python manage.py collectstatic --noinput

# Открываем порт
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]