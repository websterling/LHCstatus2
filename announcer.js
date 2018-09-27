/*
 *  Filename: announcer.js
 *
 *  Purpose:  LHC Announcer
 *
 *  Author:   Stephen Page
 *  modified by George S. Williams 09/18 & added to lhcstatus
 */

"use strict";

// Global variables

var error           = false;                                                // Error flag
var event_time      = 0;                                                    // Timestamp of last known event
var history_buffer;                                                         // Buffer of events that have occurred
var history_changed = false;                                                // Flag to indicate whether event history has changed
var history_index   = 0;                                                    // Index within history buffer
var history_length  = 20;                                                   // Length of history buffer
var storage_prefix  = 'lhc_announcer_';                                     // Prefix for configuration storage fields
var update_period   = 1000;                                                 // Period between updates in ms
var xml_request;                                                            // Request for retrieving data from server

////////////////////////////////////////////////////////////////////////////////

// Initialise when the page is opened

function init()
{
    // Clear error message as the browser supports Javascript
    set_error_message();

    // Create a buffer for the event history

    history_buffer = new Array(history_length);

    // Start receiving events if XMLHttpRequest is supported

    if(window.XMLHttpRequest)
    {
        // Create a request to receive new event data

        xml_request = new XMLHttpRequest();
        xml_request.onreadystatechange = update_page;

        // Get event data

        get_data();
    }
    else // The browser does not support XMLHttpRequest
    {
        error = true;
        set_error_message('Browser does not support XMLHttpRequest.');
    }
}

////////////////////////////////////////////////////////////////////////////////

// Retrieve event data

function get_data()
{
    xml_request.open('POST', 'get_events.py?event_time=' + event_time, true);
    xml_request.send();
}

////////////////////////////////////////////////////////////////////////////////

// Update the page with received data

function update_page()
{
    if(xml_request.readyState != 4) // Operation is not complete
    {
        return;
    }

    if(xml_request.status != 200) // HTTP status is not okay
    {
        error = true;
        set_error_message('Error reading event data.');
        setTimeout(get_data, 1000);
        return;
    }
    else if(error) // Error has cleared
    {
        error = false;
        set_error_message();
    }

    var events = xml_request.responseXML.getElementsByTagName('event');

    var initialising = event_time == 0 ? true : false;

    for(var i = 0 ; i < events.length ; i++)
    {
        var event = events[i];
        var category;
        var message;
        var url;
        var url_mp3;

        try
        {
            category    = event.attributes.getNamedItem('category').value;
            message     = event.attributes.getNamedItem('message').value;
            event_time  = parseInt(event.attributes.getNamedItem('time').value);
            url         = event.attributes.getNamedItem('url').value;
            url = 'https://announcer.web.cern.ch/announcer/' + url
            url_mp3     = url.replace(/\.ogg$/, '.mp3');
        }
        catch(e) // Error extracting event details
        {
            setTimeout(get_data, update_period);
            return;
        }

        if(initialising) // Past event during initialisation
        {
                add_history_item(event_time, message, false);
        }
        else // New event
        {
                // Check whether the event is less than a minute old

                if(event_time / 1000 > new Date().getTime() - 60000)
                {
                    add_history_item(event_time, message, true);
                    play_announcement(url, url_mp3);
                }
                else // The event is too old to announce
                {
                    add_history_item(event_time, message, false);
                    setTimeout(get_data, update_period);
                }

            break;
        }
    }

    if(events.length == 0)
    {
        if(initialising)
        {
            event_time = new Date().getTime() * 1000;
        }
        else // Not initialising
        {
            setTimeout(get_data, update_period);
            return;
        }
    }

    if(initialising)
    {
        add_history_item(new Date().getTime() * 1000, 'LHC Announcer started', true);
        play_announcement('start.ogg', 'start.mp3');
    }

    update_history();
}


////////////////////////////////////////////////////////////////////////////////

// Play an announcement

function play_announcement(url, url_mp3)
{
    if(audio_state != 'ON'){return;}
    document.getElementById('announcement').innerHTML
        = '<audio id="audio" autoplay onended="get_data()" onerror="get_data()">' +
          '<source src="' + url     + '"/>' +
          '<source src="' + url_mp3 + '"/>' +
          '</audio>';

    set_volume();
}

////////////////////////////////////////////////////////////////////////////////

// Set the audio volume

function set_volume()
{
    var volume = 10;
    document.getElementById('audio').volume = volume / 10;
}

////////////////////////////////////////////////////////////////////////////////

// Set or clear an error message

function set_error_message(message)
{
    document.getElementById('announcement').innerHTML
        = message == null ? '' : '<p class="error">' + message + '</p>';
}

////////////////////////////////////////////////////////////////////////////////

// Add an item to the history

function add_history_item(time, message, enabled)
{
    // Add the event to the history

    history_buffer[history_index] = '<li class="' + (enabled ? 'enabled' : 'disabled') + '">' +
                                    new Date(time / 1000).toLocaleString() +
                                    ' ' + message + '</li>';

    history_index   = (history_index + 1) % history_length;
    history_changed = true;
}

////////////////////////////////////////////////////////////////////////////////

// Update the displayed history

function update_history()
{
    var first         = true;
    var history_items = '';

    // Do nothing if the history has not changed

    if(!history_changed)
    {
        return;
    }
    history_changed = false;

    // Update the history

    for(var i = 1 ; i <= history_buffer.length ; i++)
    {
        var index = ((history_index + history_length) - i) % history_length;

        if(history_buffer[index] != null)
        {
            history_items += (first ? '<div id="history_list_new">' : '') +
                             history_buffer[index] +
                             (first ? '</div>' : '');

            first = false;
        }
    }
    document.getElementById('history_list').innerHTML = history_items;
}

////////////////////////////////////////////////////////////////////////////////


// EOF
