# frozen_string_literal: true

class Airline < ApplicationRecord
  has_many :reviews

  validates :name, presence: true, length: { maximum: 255 }

  # Slugify airline name into a url safe param before create
  # Ex: 'United Airlines'.parameterize => 'united-airlines'
  before_create :slugify

  def slugify
    self.slug = name.parameterize
  end

  # Get the average score of all reviews for an airline
  def avg_score
    return 0 unless reviews.count.positive?

    reviews.average(:score).round(2).to_f
  end
end
