Notifications System for admins or users?  

Make standalone REST web service (NodeJS?) for handling registering notifications.  
UI in user or admin view can post these updates when notification or notification 
page/information is viewed (similar to facebook).

Need to set up a nodeJS server with websockets*? to store and propagate information.

Notifications html/js located in process page default header?
  How to make this as easy as possible to inject functionality into view and app logic?
  Can this be done with a Java object that can figure out how to communicate with the 
  websocket/RESTful web resource (NodeJS)?
  Could it be done in process component form?  Is this bad for old pages? (YES)

JQuery Notification plugin
  This could extend to improving messages across the admin side of the application.  
  Many pages have just strings for the interactions in the page and could be shown 
  as vibrant messages to the user that are much easier to read.
    pines notification framework Notifyjs 

  Notifications will need a control panel for personal settings.  These settings are 
  not a security issue (I think) and can be stored in a doc db on the notification NodeJS server.
  
AWS nodejs + mongodb instance since we are in bed with AWS anyways
