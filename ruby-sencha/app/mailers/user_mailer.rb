class UserMailer < Devise::Mailer
  def thank_you_registration(record)
    setup_mail(record, :thank_you_registration)
  end
end
