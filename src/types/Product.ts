export interface Product {
  id: string;
  code: string;
  active_ingredient: string;
  administration_route: string;
  category: string;
  commercial_name: string;
  dosage: string;
  generic: boolean;
  ma_date: string;
  ma_number: string;
  ma_status: string;
  manufac_h: string;
  name: string;
  pharmaceutical_form: string;
  prescription_type: string;
  producer: string;
  product_code: string;
  product_id: string;
  source: string;
  therapeutic_area: string;
  therapeutic_group: string;
  therapeutic_indication: string;
  price: number;
  min_order_quantity: number;
  image_url: string;
  short_description: string;
  vendor_commission: number; // Percentage the vendor receives
  stripe_account_id: string; // Vendor's Stripe account ID
}