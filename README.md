#Weather App
This is the sample Weather Application for the Syncano platform. 



##Step 1 - Install "Syncano Weather" App Solution
The initial steps will walk you through creating a new Syncano account, creating your Instance, and installing the Weather App Solution. 

###Step 1.1 Sign Up
If you haven't already, you will need to sign up for a [new Syncano account](https://dashboard.syncano.io/#/signup). If you already have one, you can skip to step 1.2.

1. Click the link
2. Enter an email address
3. Enter a secure password
4. Click "Create My Account"


###Step 1.2 Create a New Instance
An `Instance` is your backend. Here, you will store data, define server processes, and build automations for your application. 

####If you just created a new account

1. Click "Create Your First Instance Now" 
2. Then click "Confirm" to create a new `Instance`

####If you already have an account
1. Log in to Syncano 
2. Click the plus icon in the bottom right corner
3. Then click "Confirm"

Don't forget the `Instance` name that you just created -- you will need it in the next step!
	
###Step 1.3 Install the Solution
Have you ever written an application and wished someone else had already done parts of it for you? That's what `Solutions` are -- functionality developed by members of the Syncano community.  In order to get you going, we have done most of the work for you.

In the upper right corner, click "Solutions". This is where you will find various pre-made functionality to install into your `Instance`. You can narrow your choices with tags, as well as add `Solutions` to your list of favorites. 

1. Follow this link - [Syncano Weather App](https://dashboard.syncano.io/#/solutions/76/edit)
2. Click "Install Solution"
3. Select the `Instance` you created in the previous step
4. Select version at `1.0`
5. Click "Confirm"

After you click confirm, you should be redirected to your `Instance`, with the notification in the bottom left telling you that it was successfully installed.

###Step 1 Complete
Congratulations -- you have completed step 1! You should now have a new `Instance` with the `Syncano Weather App Solution` installed.

##Step 2 - Integrate a 3rd Party Service
Syncano is great for tying together many different 3rd party APIs for your app to consume. In this step, we will set up [OpenWeatherMap](http://openweathermap.org/) to use in our application.

###Step 2.1 Sign Up for OpenWeatherMap
OpenWeatherMap is a great data source for all things weather. This app merely scratches the surface of what's possible. The great thing is, they have a free account that has a high limit of API calls for you to test.

1. Go to the [OpenWeatherMap Signup Page](http://home.openweathermap.org/users/sign_up)
2. Enter in a username, email address, and secure password
3. Click to agree with their "Terms of Service"
4. Click "Create Account"
5. After logging in, copy and store your `API Key` -- it's just after your email address and name

> A Note about OpenWeatherMap API:  This is a **free** service, and not within Syncano's control. In our testing, we have expereinced issues with their API response times, although not too often. If you see something that doesn't seem to be working, please submit an issue on [GitHub](https://github.com/Syncano-Community/weather-app/issues).

###Step 2.2 Update CodeBox Configurations
As a part of the `Solution` you installed, there are `Config` settings for the CodeBoxes that the app uses.  You must update the `Config` before you can proceed, or nothing will work.


####Get your Account Key
1. Make sure you are logged in to your Syncano Dashboard
2. Click "Account" in the upper right corner
3. Click your user name (the top menu item)
4. Then click the "Authentication" menu item
5. Copy and store your `Account Key` for the next step.

####Update Your First Config

1. Click the logo in the upper left to get back to your Instance list
2. Click the Instance with the `Syncano Weather App Solution` installed
3. In the left side menu, click "CodeBoxes"
4. Click the `weather_get_data` CodeBox

You should now be on the `Edit` screen with some code in the editor. Don't make any change here, first click `CONFIG` to switch to that screen. On this screen you will see key/value pairs - update the config with your credentials:


1. Update the `accountKey` value `ENTER-ACCOUNT-KEY-HERE` with the `Account Key` you copied from the last step. Make sure there are no quotes or anything around your key.
2. Update the `open_weather_map_api_key` value "YOPENWEATHERMAP-API-KEY" with the `OpenWeatherMap API key`. Make sure there are no quotes or anything around your key. 
3. Click `Save` 

At this point, you can test the CodeBox on the `Edit` screen. Click the `Edit` button at the top of the `Config` Copy and paste the following code in the `Payload` area below the editor.

```
{"city": "Indianapolis", "stateOrCountry": "IN"}
```

Now click the play button on the right, and the terminal window will display the results of your CodeBox run. If it doesn't work, check your `Config` and make sure you have entered typed correctly.

If everything is working, you should recieve something similar to this:

```
{"forecast":"{\"1456333200\":{\"temp_min\":273.5,\"temp_max\":277.21,\"short_description\":\"Snow\"},\"1456419600\":{\"temp_min\":271.59,\"temp_max\":273.75,\"short_description\":\"Snow\"},\"1456506000\":{\"temp_min\":269.51,\"temp_max\":274.13,\"short_description\":\"Snow\"},\"1456592400\":{\"temp_min\":272.21,\"temp_max\":277.05,\"short_description\":\"Clear\"}}","city_id":4260977,"city_name":"Marion County","current_temp":281.26,"short_description":"Clear"}
```

####Update `weather_update_active` Configuration
We need to now update the `weather_update_active` configuration. For this, make sure to first note the `weather_get_data` ID. It's located next to the name in parenthesis.  _Most likely, if this is a new `Instance`, the ID should be `1`. If not, make sure you remember the number_.

1. In the left side menu, click "CodeBoxes"
2. Click the `weather_update_active` CodeBox
3. Click `Config`
4. Update the `accountKey` value `ENTER-ACCOUNT-KEY-HERE` with the `Account Key` you copied from the last step. Make sure there are no quotes or anything around your key.
5. Update `codeboxId` with the `weather_get_data` Codebox ID.

###Step 2 Complete
Your application’s backend is completely set up now. Everything you need to run the front end code is done. Let's get the front end working next.


##Step 3 - Run Your Application
So far, you have installed a `Solution` into a new `Instance`, created your `OpenWeatherMap` account, and updated your `CodeBox` configurations.  There are only a couple more tasks left.

###Step 3.1 - Create an Instance API Key
In order to run the application, we need to create an Instance API key - which is a key for this specific Instance and scopes the data to only objects which have granted it access. You can read more about the [different authentication options](http://docs.syncano.com/docs/authentication) in our documentation.

1. Make sure you are logged in your Syncano Dashboard
2. Navigate to your Instance with the `Weather Sample App` Solution installed
3. Click on "API Keys" in the left menu
4. Click the plus icon, type in a description, and click "Confirm" -- you don't need to change any settings

After you confirm, you will see your `API Key`. Copy that and save it somewhere for later.

###Step 3.2 - Download the Application Code
There are a few last steps before you can view the application in your browser, but we are getting closer. Excited? Me too!

1. Download the [`weather-app`](https://github.com/Syncano-Community/weather-app/archive/master.zip) repo. 
2. Unzip the files and open the folder. 
3. Locate the `index.js` file in the `scripts` folder, and open it in your favorite text editor, such as Atom, WebStorm, or VIM. 

###Step 3.3 - Update the Application Code
There are 3 items you need to modify in the `index.js` file.

+ Webhook URL
+ Instance API Key
+ Instance Name

####Update the Webhook URL

1. Make sure you are logged in to your Syncano Dashboard
2. Click the Instance with the `Syncano Weather App Solution` installed
3. Click on `Webhooks` in the left side menu (it's the default page for the Instance)
4. Click the link icon under `URL` for the `weather_webhook` endpoint
5. Update `index.js` line 8 with your Webhook URL

	```
	var BASE_URL = "ADD YOUR WEBHOOK HERE";
	```

####Update the Syncano Credentials

1. Locate lines 9-12 in `index.js`
	```
	var syncano = new Syncano({
		apiKey: 'YOUR API KEY',
		instance: 'YOUR INSTANCE NAME'
	});
```
2. Change `apiKey` to be the Instance API Key from the last step. Of course, it's in quotes.
3. Change `instance` to be the Instance name with the `Weather Sample App` Solution installed.
4. Save `index.js`

###Step 3 Complete - Declare Victory

In the `weather-app-master` folder, locate the `index.html` file, and open it in your browser. Type in a city and state name, and press enter.  

##Go Further

At this point, you can look around at the other pieces in your Syncano Instance. Take a look at the CodeBoxes and learn what they do. Create your own, and try it out with the console.

Two main items we haven't covered -- 
+ Tasks - there is a schedule set up to run once every hour to update the data.
+ Channels - this is where the live updates come from. Whenever a city is updated, a Channel will send it to the front end code. 

Also -- after you have entered a few cities, make sure to look at Classes and view the `weather_active_cities` data objects that have been created. 

Now, go build your own application, and tell us about it!


### Contributors

* Kelly Andrews  - [twitter](https://twitter.com/kellyjandrews), [github](https://github.com/kellyjandrews)
* Jhishan Khan - [twitter](https://twitter.com/jhishan), [github](https://github.com/jhishan)
* Brian Chuck - [twitter](https://twitter.com/devchuk), [github](https://github.com/devChuk)



