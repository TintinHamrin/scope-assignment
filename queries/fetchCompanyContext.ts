import { gql } from '@apollo/client';

const FETCH_COMPANY = gql`
  query fetchCompanyContext {
    company {
      company {
        id
        label
        plan_features
        hidden_features
        mixmax_api_key
        mixmax_active
        wobaka_api_key
        wobaka_active
        klaviyo_active
        klaviyo_api_key
        hubspot_api_key
        hubspot_active
        collaboration_cost_currencyp
      }
      success
      errors
    }
    get_stripe_info {
      errors
      success
      stripe_info {
        daily_quota_lookalikes
      }
    }
  }
`;

export default FETCH_COMPANY;
