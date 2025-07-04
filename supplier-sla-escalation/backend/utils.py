import os
import requests
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

load_dotenv()

# Slack Webhook
SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL")

def send_slack_message(message):
    try:
        response = requests.post(
            SLACK_WEBHOOK_URL,
            json={"text": message},
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        print("Slack message sent successfully")
    except requests.exceptions.RequestException as e:
        print(f"Slack Webhook Error: {e}")

# Email via SendGrid
def send_email(to_email, subject, content):
    try:
        message = Mail(
            from_email=os.getenv("SENDGRID_SENDER"),
            to_emails=to_email,
            subject=subject,
            html_content=content
        )
        sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
        sg.send(message)
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"SendGrid Error: {str(e)}")