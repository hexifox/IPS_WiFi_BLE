import mysql.connector
import time

#MySQL Connection Variables
conn = {
    'user': 'root',
    'password': 'CoupE05041966',
    'host': '192.168.9.67',
    'database': 'ACT',
    }

#Send Function
def getMac():
    cnx = mysql.connector.connect(**conn)
    cursor = cnx.cursor()
    cursor.execute("""
    SELECT ADDR FROM LOC
    """)
    var = cursor.fetchall()
    cursor.close()
    cnx.commit()
    cnx.close()
    return var

def getRssi(Source, ADDR):
    cnx = mysql.connector.connect(**conn)
    cursor = cnx.cursor()
    cursor.execute("""
    SELECT %s FROM LOC WHERE ADDR = '%s'
    """ % (Source, ADDR))
    var = cursor.fetchall()
    cursor.close()
    cnx.commit()
    cnx.close()
    return var

def sendData(Source, ADDR, RSSI):
    cnx = mysql.connector.connect(**conn)
    cursor = cnx.cursor()
    cursor.execute( """
    UPDATE LOC SET %s = %s WHERE ADDR = '%s'
    """ % (Source ,RSSI ,ADDR))
    cursor.close()
    cnx.commit()
    cnx.close()
	
    
