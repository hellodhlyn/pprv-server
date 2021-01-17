class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  protected

  def set_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
