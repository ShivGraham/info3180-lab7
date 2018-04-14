from flask_wtf import FlaskForm
from flask_wtf.file import FileRequired, FileAllowed
from wtforms.fields import FileField, TextAreaField 
from wtforms.validators import InputRequired

class UploadForm(FlaskForm):
    photo = FileField('Photo', validators=[FileRequired(), FileAllowed(['jpeg', 'jpg', 'png'])])
    description = TextAreaField('Description', validators=[InputRequired()])