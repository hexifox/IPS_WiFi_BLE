from subprocess import Popen, PIPE
from bluetooth import *
import mysql_op, os, sys, time

###Settings###
#Retrieve Beacon Name
Source = str((os.uname()[1]).split('-')[0] + (os.uname()[1]).split('-')[2])
RSSI = ''
ADDR = ''
diff = 9

###Functions Definition###
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

#Array Building Function
def createAddrArray(var):
    newVar = {}
    for i in range(len(var)):
        dbVar = removeExtra(mysql_op.getRssi(Source,var[i]))
        if dbVar[0] == 'NONE':
            preVar = 0
        else:
            preVar = int(''.join(dbVar))
        print preVar
        newVar[var[i]] = [preVar for x in range(5)]
    return newVar

#Smart average 
def smartAVG(val, addr):
    for i in reversed(range(len(DATA[addr]))):
        if i == 0:
            DATA[addr][0] = val
        else:
            DATA[addr][i] = DATA[addr][i-1]
    avg = sum(DATA[addr])/len(DATA[addr])
    print "RSSI Measured: %s" %val
    print "Avg from previous Data: %s" %avg
    if avg - diff < val < avg + diff:
        newRssi = (val+avg)/2
        print "Within range, new rssi: %s" %newRssi
    else:
        newRssi = avg
        print "Out of range, new rssi: %s" %newRssi
    return newRssi

###Configuration###
#Get Known BT MAC Addresses from DB
KnownBDADDR = mysql_op.getMac()
#Clean retrieved MAC Addresses
KnownBDADDR = removeExtra(KnownBDADDR)
#Create an array from MAC Addresses
DATA = createAddrArray(KnownBDADDR)
#Display Retrived Info
print(DATA)

###Init program###
#Command for Bluetooth Dump analysis
cmdDump = "hcidump -t -a"
#Start Command
procDump = Popen(cmdDump.split(), shell=True,
                 stdout = PIPE, stderr = PIPE,
                 bufsize=1)

###Start Program###
try:
    print"Starting process for: %s" % Source
    for line in iter(procDump.stdout.readline, ""):
        CONT = line.split(" ")
        if "bdaddr" in CONT:
            ADDR = CONT[CONT.index("bdaddr")+1]
            if ADDR in DATA:
                print"Found Device %s" % ADDR
                Device = 1
            else:
                Device = 0
        if "RSSI:" in CONT:
            if Device == 1:
                rawRSSI = - int(CONT[CONT.index("RSSI:")+1].split('\n')[0])
                RSSI = smartAVG(rawRSSI, ADDR)
                print "RAW & AVGD RSSI: %s / %s" %(rawRSSI, RSSI)
                mysql_op.sendData(Source, ADDR, RSSI)
                print(DATA)

###Program Exit###
except KeyboardInterrupt:
    procDump.kill()
procDump.wait()
procDump.stdout.close()
