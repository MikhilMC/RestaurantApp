export class TimeTable{
  constructor(
    public _id: string,
    public start: {
      hour: number,
      minute: number
    },
    public end: {
      hour: number,
      minute: number
    },
    public orders: [],
    public hasClosed: boolean
  ) {}
}