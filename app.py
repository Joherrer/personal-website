import os
from flask import Flask, request, render_template, redirect, url_for, flash, jsonify
from flask_session import Session
from flask_mail import Mail, Message
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set up secret key 
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Configure session to use filesystem
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
Session(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        return render_template('contact.html')
    else:
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        msg = Message('Contact Form Message', sender=email, recipients=[os.getenv('MAIL_USERNAME')])
        msg.body = f'Name: {name}\n\nEmail: {email}\n\n\nMessage:\n\n\n{message}'
        
        try:
            mail.send(msg)
            flash('Message sent successfully!', 'success')
            return redirect(url_for('contact', status='submitted'))

        except Exception as e:
            flash('An error occurred while sending your message. Please try again.', 'warning')
            print(f'Error: {e}')
            return redirect(url_for('contact'))

if __name__ == '__main__':
    app.run(debug=True)
