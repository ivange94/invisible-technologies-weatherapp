import React, { useState } from 'react';

import { parse } from './../../utils'
import { getWeather } from './weather.resource'
import { Formik, Field, Form } from 'formik'

export const Weather = () => {
    const [results, setResults] = useState([]);

    const handleSubmit = (values) => {
        const { locations_str } = values;
        const locations = parse(locations_str)
        Promise.all(locations.map(location => getWeather(location)))
               .then(forcasts => {
                   const weatherResults = forcasts.map(forcast => {
                       const { weather, main: { temp }, sys: { country }, name} = forcast
                       const { description } = weather[0]
                       return {
                           cityName: name,
                           country,
                           description,
                           temperature: temp
                       }
                   })
                   setResults(weatherResults)
               }).catch(err => {
                    console.log(err)
               })
    }

    return (
        <div>
            <Formik
                initialValues={{locations_str: ''}}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    handleSubmit(values)
                }}
            >
                <Form>
                    <label htmlFor="locations">Enter locations</label><br/>
                    <Field as="textarea" name="locations_str"/><br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            {
                results.length > 0 && (
                    <div>
                        <h3>Weather Forcasts</h3>
                        {
                            results.map(({ cityName, country, description, temperature }, index) => (
                                <div key={index}>
                                    <div>
                                        <span><strong>{cityName}, {country}</strong></span>
                                    </div>
                                    <div>
                                        <img src="" />
                                        <span>{temperature + String.fromCharCode(176)}, {description}</span>
                                    </div>
                                    <hr/>
                                </div>
                            ))
                        }
                    </div>
                )
                
            }
        </div>
    )
}