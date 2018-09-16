#! /usr/bin/env python


import cgi
import cgitb
cgitb.enable()
import subprocess
import time


form = cgi.FieldStorage()
event_time = form['event_time'].value

print 'Content-type: text/xml\n'
events = subprocess.check_output(['/usr/bin/wget -qO- https://announcer.web.cern.ch/announcer/get_events.pl?' + event_time], shell=True)
print events

