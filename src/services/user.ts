import apiClient from '@/utils/api';

const USER_ENDPOINTS = {
  CHECK_INBOX_AVAILABILITY: '/user/check-inbox-availability/',
  GET_SUGGESTED_USERNAMES: '/user/get-suggested-usernames/',
  CREATE_INBOX: '/user/create-inbox/',
  COMPLETE_DATA: '/user/complete-data/',
  GLOBAL_STATS: '/user/global-stats/',
  ONBOARDING: '/user/onboarding/',
  ONBOARDING_STATUS: '/user/onboarding/status/',
} as const;

const DIRECTORY_ENDPOINTS = {
  CATEGORIES: '/directory/categories/',
} as const;

// Helper to log detailed error info
const logApiError = (endpoint: string, error: any) => {
  console.error(`❌ API Error [${endpoint}]:`);
  console.error('  Status:', error.response?.status);
  console.error('  Status Text:', error.response?.statusText);
  console.error('  Response Data:', JSON.stringify(error.response?.data, null, 2));
  console.error('  Request URL:', error.config?.url);
  console.error('  Request Method:', error.config?.method);
  console.error('  Request Data:', error.config?.data);
};

// Response types
export interface InboxAvailabilityResponse {
  available: boolean;
  message: string;
}

export interface SuggestedUsernamesResponse {
  suggestions: string[];
}

export interface CreateInboxResponse {
  success: boolean;
  inboxEmail: string;
}

export interface UserCompleteDataResponse {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  birthYear: string | null;
  gender: string | null;
  isVerified: boolean;
  isInboxCreated: boolean;
  inboxEmail: string | null;
  createdAt: string;
}

// Category types
export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  icon?: string;
  description?: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Onboarding types
export interface OnboardingRequest {
  username?: string;
  categories?: string[];
  reminder?: string;
  reminderTime?: string;
  whereHeard?: string;
  notificationToken?: string;
}

export interface OnboardingResponse {
  success: boolean;
  message?: string;
}

export interface OnboardingStatusResponse {
  isComplete: boolean;
  hasUsername: boolean;
  hasCategories: boolean;
  categoryCount: number;
}

class UserService {
  /**
   * Check if a username is available for creating an inbox email address
   */
  async checkInboxAvailability(username: string): Promise<InboxAvailabilityResponse> {
    try {
      const response = await apiClient.get<InboxAvailabilityResponse>(
        USER_ENDPOINTS.CHECK_INBOX_AVAILABILITY,
        { params: { username } }
      );
      return response.data;
    } catch (error: any) {
      logApiError('CHECK_INBOX_AVAILABILITY', error);
      throw error;
    }
  }

  /**
   * Get suggested usernames for creating an inbox email address
   */
  async getSuggestedUsernames(name?: string, basedOn?: string): Promise<SuggestedUsernamesResponse> {
    try {
      const params: Record<string, string> = {};
      if (name) params.name = name;
      if (basedOn) params.basedOn = basedOn;

      const response = await apiClient.get<SuggestedUsernamesResponse>(
        USER_ENDPOINTS.GET_SUGGESTED_USERNAMES,
        { params }
      );
      return response.data;
    } catch (error: any) {
      logApiError('GET_SUGGESTED_USERNAMES', error);
      throw error;
    }
  }

  /**
   * Create an inbox email address for the authenticated user
   */
  async createInbox(username: string): Promise<CreateInboxResponse> {
    try {
      console.log('📤 Creating inbox with username:', username);
      const response = await apiClient.post<CreateInboxResponse>(
        USER_ENDPOINTS.CREATE_INBOX,
        { username }
      );
      console.log('✅ Inbox created:', response.data);
      return response.data;
    } catch (error: any) {
      logApiError('CREATE_INBOX', error);
      throw error;
    }
  }

  /**
   * Get complete user data
   */
  async getCompleteData(): Promise<UserCompleteDataResponse> {
    try {
      const response = await apiClient.get<UserCompleteDataResponse>(USER_ENDPOINTS.COMPLETE_DATA);
      return response.data;
    } catch (error: any) {
      logApiError('COMPLETE_DATA', error);
      throw error;
    }
  }

  /**
   * Get all newsletter categories (public endpoint)
   */
  async getCategories(): Promise<CategoriesResponse> {
    try {
      const response = await apiClient.get<CategoriesResponse>(DIRECTORY_ENDPOINTS.CATEGORIES);
      return response.data;
    } catch (error: any) {
      logApiError('CATEGORIES', error);
      throw error;
    }
  }

  /**
   * Complete user onboarding
   */
  async completeOnboarding(data: OnboardingRequest): Promise<OnboardingResponse> {
    try {
      console.log('📤 Onboarding request data:', JSON.stringify(data, null, 2));
      const response = await apiClient.post<OnboardingResponse>(USER_ENDPOINTS.ONBOARDING, data);
      console.log('✅ Onboarding response:', response.data);
      return response.data;
    } catch (error: any) {
      logApiError('ONBOARDING', error);
      throw error;
    }
  }

  /**
   * Get onboarding status
   */
  async getOnboardingStatus(): Promise<OnboardingStatusResponse> {
    try {
      const response = await apiClient.get<OnboardingStatusResponse>(USER_ENDPOINTS.ONBOARDING_STATUS);
      return response.data;
    } catch (error: any) {
      logApiError('ONBOARDING_STATUS', error);
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;
