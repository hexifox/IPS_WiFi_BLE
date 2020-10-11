import sys
import os
import struct
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

call(["sudo","hciconfig","hci0","down"])
call(["sudo","hciconfig","hci0","up"])

btlib = find_library("bluetooth")
bluez = CDLL(btlib, use_errno=True)

dev_id = bluez.hci_get_route(None)

sock = socket(AF_BLUETOOTH, SOCK_RAW, BTPROTO_HCI)
sock.bind((dev_id,))

err = bluez.hci_le_set_scan_parameters(sock.fileno(), 0, 0x10, 0x10, 0, 0, 1000);
if err < 0:
    raise Exception("Set scan parameters failed")
    # occurs when scanning is still enabled from previous call

# allows LE advertising events
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

while True:
    data = sock.recv(1024)
    # print bluetooth address from LE Advert. packet
    addr = ':'.join("{0:02x}".format(ord(x)) for x in data[12:6:-1])
    if addr == "00:46:40:0c:00:48":
        rssi = ord(format(data[-1]))
        newrssi = 101 - rssi
        print addr,rssi, newrssi
