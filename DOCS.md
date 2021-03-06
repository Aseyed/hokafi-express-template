# time-sheet v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Event](#event)
	- [Create event](#create-event)
	- [Delete event](#delete-event)
	- [Retrieve event](#retrieve-event)
	- [Retrieve events](#retrieve-events)
	- [Update event](#update-event)
	
- [Project](#project)
	- [Create project](#create-project)
	- [Delete project](#delete-project)
	- [Retrieve project](#retrieve-project)
	- [Retrieve projects](#retrieve-projects)
	- [Update project](#update-project)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Event

## Create event



	POST /events


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| title			| 			|  <p>Event's title.</p>							|
| eventDate			| 			|  <p>Event's eventDate.</p>							|
| description			| 			|  <p>Event's description.</p>							|
| registrationStartDate			| 			|  <p>Event's registrationStartDate.</p>							|
| registrationEndDate			| 			|  <p>Event's registrationEndDate.</p>							|
| registerUsers			| 			|  <p>Event's registerUsers.</p>							|
| organizer			| 			|  <p>Event's organizer.</p>							|
| more			| 			|  <p>Event's more.</p>							|
| location			| 			|  <p>Event's location.</p>							|

## Delete event



	DELETE /events/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve event



	GET /events/:id


## Retrieve events



	GET /events


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update event



	PUT /events/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| title			| 			|  <p>Event's title.</p>							|
| eventDate			| 			|  <p>Event's eventDate.</p>							|
| description			| 			|  <p>Event's description.</p>							|
| registrationStartDate			| 			|  <p>Event's registrationStartDate.</p>							|
| registrationEndDate			| 			|  <p>Event's registrationEndDate.</p>							|
| registerUsers			| 			|  <p>Event's registerUsers.</p>							|
| organizer			| 			|  <p>Event's organizer.</p>							|
| more			| 			|  <p>Event's more.</p>							|
| location			| 			|  <p>Event's location.</p>							|

# Project

## Create project



	POST /projects


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| subject			| 			|  <p>Project's subject.</p>							|
| description			| 			|  <p>Project's description.</p>							|

## Delete project



	DELETE /projects/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve project



	GET /projects/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve projects



	GET /projects


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update project



	PUT /projects/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| subject			| 			|  <p>Project's subject.</p>							|
| description			| 			|  <p>Project's description.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


