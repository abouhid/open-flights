# frozen_string_literal: true

class Airline < ApplicationRecord
  has_many :reviews

  validates :name, presence: true, length: { maximum: 255 }

  # Slugify airline name into a url safe param before create
  # Ex: 'United Airlines'.parameterize => 'united-airlines'
  before_create lambda { |airline|
    airline.slug = airline.name.parameterize
  }

  # Get the average score of all reviews for an airline
  def calculate_average
    return 0 unless reviews.size.positive?

    avg = reviews.average(:score).to_f.round(2) * 100
    update_column(:average_score, avg)
  end
end
