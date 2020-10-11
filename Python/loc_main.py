import os, sys, time, struct
import numpy as np
import mysql_op as mo
from pykalman import UnscentedKalmanFilter
from ctypes import (CDLL, get_errno)
from ctypes.util import find_library
from subprocess import call
from socket import (
    socket,
    AF_BLUETOOTH,
    SOCK_RAW,
    BTPROTO_HCI,
    SOL_HCI,
    HCI_FILTER,
)

###Settings###
#Kalman Filter
ukf = UnscentedKalmanFilter(lambda x,w: x + np.sin(w), lambda x, v:x + v, observation_covariance=0.1)
(filtered_state_means, filtered_state_covariance) = ukf.filter([0,0,0])
(smoothed_state_means, smoothed_state_covariance) = ukf.smooth([0,0,0])
#Retrieve Beacon Name
Source = str((os.uname()[1]).split('-')[0] + (os.uname()[1]).split('-')[2])
RSSI = ''
ADDR = ''
diff = 9
numr = 0
kalrssi = []
#BT ON/OFF
call(["sudo","hciconfig","hci0","down"])
call(["sudo","hciconfig","hci0","up"])

#BT SETUP
btlib = find_library("bluetooth")
bluez = CDLL(btlib, use_errno=True)
dev_id = bluez.hci_get_route(None)
sock = socket(AF_BLUETOOTH, SOCK_RAW, BTPROTO_HCI)
sock.bind((dev_id,))
err = bluez.hci_le_set_scan_parameters(sock.fileno(), 0, 0x10, 0x10, 0, 0, 1000);

if err < 0:
    raise Exception("Set scan parameters failed")

hci_filter = struct.pack(
    "<IQH", 
    0x00000010, 
    0x4000000000000000, 
    0
)

sock.setsockopt(SOL_HCI, HCI_FILTER, hci_filter)
err = bluez.hci_le_set_scan_enable(
    sock.fileno(),
    1,  # 1 - turn on;  0 - turn off
    0, # 0-filtering disabled, 1-filter out duplicates
    1000  # timeout
)

###Functions Definition###
#Kalman Filter Functions
def kalSmooth(args):
    return ukf.smooth(args)[0]
def kalFilter(args):
    return ukf.filter(args)[0]
    
#Refinig Data Functions
def removeExtra(val):
    if isinstance(val, list):
        newVal = []
        for i in iter(val):
            j = str(i)
            j = j.replace('(','').replace(')','').replace("'",'').replace('u','').replace(',','')
            newVal.append(j)
    else:
        newVal = str(val)
        newVal = newVal.replace('(','').replace(')','').replace("'",'').replace('u','').replace(',','')
    return newVal

###Configuration###
#Get Known BT MAC Addresses from DB
KnownBDADDR = mo.getMac()
#Clean retrieved MAC Addresses
KnownBDADDR = removeExtra(KnownBDADDR)
print KnownBDADDR
#Display Retrived Info
print"Starting process for: %s" % Source

while True:
    data = sock.recv(1024)
    # print bluetooth address from LE Advert. packet
    addr = '' + ':'.join("{0:02x}".format(ord(x)) for x in data[12:6:-1])
    print addr
    if addr == '00:46:40:0c:00:48':
        rssi = ord(format(data[-1]))
        newrssi = 101 - rssi
        kalrssi.append(newrssi)
        numr += 1
        print addr,rssi, newrssi, kalrssi
        if numr == 10:
            filteredrssi = (sum(kalSmooth(kalrssi))/len(kalrssi))[0]
            print "Kalman Filtered RSSI:", filteredrssi
            print "Uploading Data ..."
            mo.sendData(Source, addr, filteredrssi)
            print "Done !"
            numr = 0
            kalrssi = []
