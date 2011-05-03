class RegistrationsController < Devise::RegistrationsController

  # POST /resource
  def create
    build_resource

    if resource.save
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        UserMailer.thank_you_registration(resource).deliver
        sign_in(resource_name, resource)
        respond_to do |format|
          format.html {
            respond_with resource, :location => redirect_location(resource_name, resource)
          }
          format.json {
            render :json => { :success => true, :message => I18n.t("devise.registrations.#{:signed_up}") }
          }
        end
      else
        set_flash_message :notice, :inactive_signed_up, :reason => resource.inactive_message.to_s if is_navigational_format?
        expire_session_data_after_sign_in!
        respond_to do |format|
          format.html {
            respond_with resource, :location => after_inactive_sign_up_path_for(resource)
          }
          format.json {
            render :json => { :success => true, :message => I18n.t("devise.registrations.#{:inactive_signed_up}") }
          }
        end
      end
    else
      clean_up_passwords(resource)
      respond_to do |format|
        format.html {
          respond_with_navigational(resource) { render_with_scope :new }
        }
        format.json {
          render :json => { :success => false, :message => resource.errors.full_messages.join('<br/>') }
        }
      end
    end
  end

end
