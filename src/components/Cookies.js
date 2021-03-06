import React from "react"
import CookieConsent from "react-cookie-consent";
import { cookies } from "../translations/translations";
import "../css/cookies.css"

export const Cookies = ({ theme, lang }) => {
    return (
        <CookieConsent
            location="bottom"
            buttonText={ cookies.accept[lang] }
            declineButtonText={ cookies.decline[lang] }
            cookieName="gatsby-gdpr-google-analytics"
            enableDeclineButton
            style={{
                background: theme.colors.light1,
                boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.25)',
                margin: '0 1.5em 1.5em',
                width: 'calc(100% - 3em)',
                borderRadius: '.5em',
                padding: '.25rem',
                alignItems: 'center',
            }}
            contentStyle={{
                color: theme.colors.dark1
            }}
            buttonWrapperClasses='buttons-wrapper'
            buttonStyle={{
                padding: '0.6rem 1.5rem',
                margin: '.75rem .5rem',
                backgroundColor: theme.colors.main1,
                border: `1px solid transparent`,
                borderRadius: '0.5rem',
                color: theme.colors.light1,
                fontWeight: 700,
                fontSize: '0.875rem',
                width: 'fit-content',
                transition: 'filter 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
            }}
            declineButtonStyle={{
                padding: '0.6rem 1.5rem',
                margin: '.75rem .5rem',
                backgroundColor: 'transparent',
                border: `1px solid ${theme.colors.main1}`,
                borderRadius: '0.5rem',
                color: theme.colors.main1,
                fontWeight: 400,
                fontSize: '0.875rem',
                width: 'fit-content',
                transition: 'filter 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
            }}
        >
            { cookies.text[lang] }
        </CookieConsent> 
    )
}