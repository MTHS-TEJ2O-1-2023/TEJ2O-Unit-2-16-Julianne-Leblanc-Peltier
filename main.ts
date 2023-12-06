/* Copyright (c) 2023 MTHS All rights reserved
 *
 * Created by: Julianne Leblanc-Peltier
 * Created on: Dec 2023
 * This program sends a string to another MicroBit using radio signals, depending on the distance of the sonar to an object
*/

// variables
let distanceToObject: number = 0

// setup
radio.setGroup(76)
basic.showIcon(IconNames.Asleep)

// if button a is pressed, sends string 'too close' if distance is less than 10
input.onButtonPressed(Button.A, function () {
  // checks distance of sonar to object in front
  distanceToObject = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
  )
  // if the distance is less than 10 cm, project string "too close" to second MicroBit
  if (distanceToObject <= 10) {
    radio.sendString('Too Close')
    basic.showIcon(IconNames.Meh)
  }
})

// allows to receive strings from other MicroBits on the same frequency.
radio.onReceivedString(function (receivedString) {
  basic.clearScreen()
  basic.showString(receivedString)
  basic.showIcon(IconNames.Happy)
})
