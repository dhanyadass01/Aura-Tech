
import { createClient } from '@supabase/supabase-js';
import { ProjectData, User } from './types';

/**
 * AURA TECH - Supabase Backend Service
 * 
 * REQUIRED TABLE SCHEMA:
 * Run this in your Supabase SQL Editor:
 * 
 * CREATE TABLE projects (
 *   id bigint primary key generated always as identity,
 *   client_name text not null,
 *   client_email text not null,
 *   client_phone text not null,
 *   client_type text not null, 
 *   project_title text not null,
 *   project_type text not null,
 *   description text not null,
 *   created_at timestamptz default now()
 * );
 * 
 * ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Enable insert for all users" ON projects FOR INSERT WITH CHECK (true);
 */

const DEFAULT_URL = 'https://vjcogmxzgmvpbqevrdiy.supabase.co';
const DEFAULT_KEY = 'sb_publishable_o5qmsKgQPmyUPxo_t6snXA_ZDo3isxr';

const supabaseUrl = (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || DEFAULT_URL;
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) || DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseService = {
  async saveProject(user: User, project: ProjectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            client_name: user.name,
            client_email: user.email,
            client_phone: user.phone,
            client_type: user.userType,
            project_title: project.title,
            project_type: project.type,
            description: project.description,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) {
        if (error.code === '42P01' || (error.message && error.message.includes('schema cache'))) {
          throw new Error('DATABASE_SETUP_REQUIRED');
        }
        const detailedError = `Supabase Error: ${error.message}${error.details ? ` (${error.details})` : ''}${error.hint ? ` - ${error.hint}` : ''}`;
        throw new Error(detailedError);
      }

      return data;
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
      console.error('Supabase Layer Error Details:', errorMessage);
      throw err;
    }
  }
};
