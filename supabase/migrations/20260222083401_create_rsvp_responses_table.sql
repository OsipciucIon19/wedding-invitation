/*
  # Create RSVP Responses Table

  ## Overview
  Creates a table to store wedding invitation RSVP responses from guests.

  ## New Tables

  ### `rsvp_responses`
  Stores guest responses to wedding invitation
  - `id` (uuid, primary key) - Unique identifier for each response
  - `name` (text, required) - Guest's full name
  - `attending` (boolean, required) - Whether guest will attend (true) or not (false)
  - `num_people` (integer, default 1) - Number of people attending
  - `message` (text, optional) - Personal message from guest
  - `created_at` (timestamptz) - Timestamp when response was submitted

  ## Security
  - Enable Row Level Security (RLS) on `rsvp_responses` table
  - Policy: Allow anyone to insert their RSVP response
  - Policy: Only authenticated users can read all responses (for admin purposes)

  ## Notes
  - Table is public-facing for RSVP submissions
  - Insert policy allows anonymous submissions for guest convenience
  - Read access restricted to authenticated users only
*/

-- Create rsvp_responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
                                              id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    attending boolean NOT NULL,
    num_people integer DEFAULT 1 CHECK (num_people > 0 AND num_people <= 10),
    message text,
    created_at timestamptz DEFAULT now()
    );

-- Enable Row Level Security
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert RSVP responses
CREATE POLICY "Anyone can submit RSVP"
  ON rsvp_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can view all responses (admin)
CREATE POLICY "Authenticated users can view responses"
  ON rsvp_responses
  FOR SELECT
                        TO authenticated
                        USING (true);

-- Create index for faster queries by creation date
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_created_at
    ON rsvp_responses(created_at DESC);