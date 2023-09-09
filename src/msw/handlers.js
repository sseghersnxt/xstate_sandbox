import { graphql } from "msw";

export const handlers = [
  graphql.query("GetWeatherByZip", (req, res, ctx) => {
    return res(
      ctx.data({
        getWeatherByZip: {
          humidity: "30%",
          heatIndex: "85F",
          temperature: "80F",
          zip: Number(req.variables.zip),
        }
      })
    );
  }),
  graphql.query("GetCitiesByTemperature", (req, res, ctx) => {
    return res(
      ctx.data({
        getCitiesByTemperature: [
          { 'city': 'Abbeville', 'state': 'Louisiana', 'temperature': req.variables.temp },
          { 'city': 'Ayer', 'state': 'Massachusetts', 'temperature': req.variables.temp },
          { 'city': 'Azalea Park', 'state': 'Florida', 'temperature': req.variables.temp },
          { 'city': 'Azle', 'state': 'Texas', 'temperature': req.variables.temp },
          { 'city': 'Aztec', 'state': 'New Mexico', 'temperature': req.variables.temp },
          { 'city': 'Azusa', 'state': 'California', 'temperature': req.variables.temp },
          { 'city': 'Babylon', 'state': 'New York', 'temperature': req.variables.temp },
          { 'city': 'Back Mountain', 'state': 'Pennsylvania', 'temperature': req.variables.temp },
          { 'city': 'Bacliff', 'state': 'Texas', 'temperature': req.variables.temp },
          { 'city': 'Bainbridge', 'state': 'Georgia', 'temperature': req.variables.temp },
        ]
      })
    )
  }),
];
