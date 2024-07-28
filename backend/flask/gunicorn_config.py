import os

bind = f"0.0.0.0:{os.environ.get('FLASK_SERVER_PORT')}"
workers = 2
