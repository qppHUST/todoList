export class DataToSet {
  constructor(
    activeLeft: string,
    value: string,
    activeRight: string,
    hash: string,
    timeStamp: string
  ) {
    this.activeLeft = activeLeft
    this.activeRight = activeRight
    this.hash = hash
    this.timeStamp = timeStamp
    this.value = value
  }
  activeLeft: string
  value: string
  activeRight: string
  hash: string
  timeStamp: any
}
