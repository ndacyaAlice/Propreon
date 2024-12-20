import {
    nat,
    text,
    Record,
    Variant,
    Principal,
    Vec, 
    bool,
    Opt,
    nat64
} from "azle/experimental";


export const Property = Record({
    id: text,
    Owner: Principal,
    Title: text,
    Bedroom: text,
    Bathroom:text,
    Parking: bool,
    Description: text,
    Location: text,
    PricePerVisit: text, 
    Image: text,
    CreatedAt: text,
    UpdatedAt: text 

})

export type Property = typeof Property.tsType

export const PropertyProps = Record({
    Title: text,
    Bedroom: text,
    Bathroom:text,
    Parking: bool,
    Description: text,
    Location: text,
    PricePerVisit: text, 
})

export type PropertyProps = typeof PropertyProps.tsType
export const BookStatus= Variant({
    PENDING:text,
    CONFIRMED: text,
    CANCELED:text
})

export type BookStatus = typeof BookStatus.tsType

export const PaymentStatus = Variant({
    UNPAID: text,
    PAID:text
})
export type PaymentStatus = typeof PaymentStatus.tsType

export const Booking=Record({
  id: text,
  PropertyId: text,
  Owner: Principal,
  Visitor: Principal,
  VisitDate: text,
  Status:  BookStatus,
  Amount: nat64,    
  PaymentStatus:  PaymentStatus,
  CreatedAt: text,
  paid_at_block: Opt(nat64),
  memo: nat64,
})

export type Booking = typeof Booking.tsType


export const Message = Variant({
    NotFound: text,
    InvalidPayload: text,
    Error: text,
    NoProfile: text,
    Unauthorized: text
  })
  
  export type Message = typeof Message.tsType
  