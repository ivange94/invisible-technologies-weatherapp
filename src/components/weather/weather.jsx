import React, { useState } from 'react';

import { parse } from './../../utils'
import { getWeather } from './weather.resource'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import styles from './weather.module.css';

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
        <div className={styles.app}>
            <h1>Invisible Technologies Weather App(US Cities)</h1>
            <Formik
                initialValues={{locations_str: ''}}
                validate={values => {
                    const errors = {}
                    if (!values.locations_str) {
                        errors.locations_str = 'Required'
                    } else {
                        const { locations_str } = values
                        const locations = locations_str.split(',')
                        if (locations.length < 2 || locations.length % 2 !== 0) {
                            errors.locations_str = "Invalid entry: You're either missing a city name or postal code"
                        } else {
                            const parseLocations = parse(locations_str)
                            parseLocations.forEach(({ postalCode }) => {
                                if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(postalCode)) {
                                    errors.locations_str = `Invalid postal code(must be a valid US postal code): ${postalCode}`
                                }
                            })
                        }

                    }
                    return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    handleSubmit(values)
                }}
            >
                <Form>
                    <label htmlFor="locations">Enter locations as a single string of the form (location name, postal code)</label><br/><br/>
                    <Field as="textarea" name="locations_str" placeholder="Portland, 2005, Dallas, 75001"/><br/>
                    <ErrorMessage name="locations_str">
                        { msg => <div style={{color: 'red'}}>{msg}</div>}
                    </ErrorMessage><br/>
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