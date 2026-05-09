import API_BASE_URL from "../config/api";
import { getAuthToken } from "../utils/auth";

const BASE_URL = `${API_BASE_URL}/api/sellers/marketing/platforms`;

export async function getSocialMarketingPlatforms() {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load social marketing platforms");
  return data;
}
