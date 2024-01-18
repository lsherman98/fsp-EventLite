class Event < ApplicationRecord



    validates :title, :description, :city, :date, :price, :address, :start_time, :category, presence: true
    validates :category, inclusion: {in: ['Hobbies', 'Night Life', 'Music', 'Food', 'Performing Arts']}
    validates :city, inclusion: {in: ['Miami', 'New York', 'Seattle', 'Los Angeles', 'Philadelphia']}
    # validate :valid_date, on: :create




    belongs_to :organizer,
      foreign_key: :user_id,
      class_name: :User


    has_many :bookmarks
    has_many :bookmarking_users, through: :bookmarks, source: :user

    has_many :registrations
    has_many :registered_users, through: :registrations, source: :user





    private
    def valid_date
      errors.add(:date, 'The start date can not be in the past!') unless self.date > Date.today
    end
end