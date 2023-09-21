/**
 * 
 */
import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const date = new Date("2022-01-01")
            const month = getMonth(date)

            expect(month).toBe("janvier")
            
            // to implement
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            // to implement
            const date = new Date("2022-07-08")
            const month = getMonth(date)

            expect(month).toBe("juillet")
        });
    });
})
