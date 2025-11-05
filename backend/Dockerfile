FROM python:3.11-slim

WORKDIR /app

COPY uchimuchi/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Выполняем миграции и собираем статику, если нужно
# FOR Django static files, настроенного для сервера
# RUN python manage.py collectstatic --noinput

# Открываем порт
EXPOSE 8000

CMD ["gunicorn", "your_project_name.wsgi:application", "--bind", "0.0.0.0:8000"]