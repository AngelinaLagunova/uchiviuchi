import os
from PIL import Image

# Папка с исходными изображениями
input_folder = 'input'
# Папка для сохранения результатов
output_folder = 'output'

# Желательная ширина (например, максимальная желаемая ширина)
target_width = 2500  # задайте вашу желаемую ширину

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if not filename.lower().endswith('.png'):
        continue

    path = os.path.join(input_folder, filename)
    with Image.open(path) as im:
        width, height = im.size
        print(width, height)

        # Проверяем ориентацию
        if width >= height + height/5:
            # Горизонтальное или квадратное - оставляем как есть
            new_im = im
        else:
            # Вертикальное изображение - добавляем прозрачные поля слева и справа
            new_width = target_width
            if new_width < width:
                # Если целевая ширина меньше исходной, можно увеличить target_width или масштабировать
                new_width = width  # Для простоты не уменьшаем размер

            # Создаем новое пустое изображение с прозрачным фоном
            new_im = Image.new('RGBA', (new_width, height), (0, 0, 0, 0))

            # Расчёт отступа для центрирования изображения
            left_offset = (new_width - width) // 2

            # Вставляем исходное изображение на новое сдвинув по оси X
            new_im.paste(im, (left_offset, 0))

        # Сохраняем результат
        new_im.save(os.path.join(output_folder, filename))

print("Готово!")