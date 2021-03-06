
<h1 align="center">
    <b>Anime converter </b> 
<br>
</h1>

## What is this for?
This repository convert your normal image into anime image.


## Anime
Anime is hand-drawn and computer animation originating from Japan. In Japan and in Japanese, anime describes all animated works, regardless of style or origin. However, outside of Japan and in English, anime is colloquial for Japanese animation and refers specifically to animation produced in Japan.


## Links to references

HuggingFace

https://huggingface.co/spaces/akhaliq/AnimeGANv2


## File Path
Here is the file path for Cartoon ML Model.
```/CartoonAPI/CartoonAPI.ipynb```

You can use the CartoonAPI file in your Colab setup



## Colab Cartoon API dependencies Installation
```pip install flask-ngrok```

```pip install pyngrok```

```pip install -U flask-cors```

```pip install flask-ngrok```


## Instruction
First, set up this repository on your local machine or colab. Installing all dependency in your Machine and authentication your ngrok token.
 
To run 
run all the jupiter or colab cell

To make changes
at line 5 on ```ngrok authtoken "<_YOUR_NGROK_TOKEN_>"``` this is your ngrok token.

To access the API.
```<_YOUR_NGROK_LINK_>/img?img=<_YOUR_BASE64_IMAGE_>```



## Laravel and Vue Installation

Clone the Application on your local system.
After cloning the application on your local system use ```cd Cartoon-Image-ML-Model``` command to go to the Cartoon ML model Directory 

Install the default dependencies by running the following command.

```composer update```

```npm install```

## Setting Up Database

First change the default database in ```config/database.php```
Add your database credentials in ```.env``` file.
Run ```php artisan migrate``` to setup your database migration.


## To start your Local server


```npm run dev```

```php artisan serve```


## Total Route Link 


Open your local server and go to this path:

```http://127.0.0.1:8000/linkadd```

Go To Home Page

```http://127.0.0.1:8000/``` or ```http://127.0.0.1:8000/cartoonhome```





## Demo Video

<img src="./demo/Laravel.gif" width="700" height="400" />


## Contributing

If you want to contribute to a project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.









