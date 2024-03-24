
import {
  withAsyncTryCatch,
} from "@emmveqz/util-tools-common"
import Twilio from "twilio"
import type {
  LocalListInstanceOptions,
} from "twilio/lib/rest/api/v2010/account/availablePhoneNumberCountry/local"
import type {
  CallInstance,
  CallListInstancePageOptions,
} from "twilio/lib/rest/api/v2010/account/call"
import type {
  IncomingPhoneNumberListInstanceCreateOptions,
} from "twilio/lib/rest/api/v2010/account/incomingPhoneNumber"
import type {
  MessageInstance,
} from "twilio/lib/rest/api/v2010/account/message"
import type {
  ApiV2010AccountTokenIceServers,
} from "twilio/lib/rest/api/v2010/account/token"
import type {
  BrandRegistrationInstance,
} from "twilio/lib/rest/messaging/v1/brandRegistration"
import type {
  ExternalCampaignInstance,
} from "twilio/lib/rest/messaging/v1/externalCampaign"
import type {
  ServiceInstance,
} from "twilio/lib/rest/messaging/v1/service"
import type {
  PhoneNumberInstance,
} from "twilio/lib/rest/messaging/v1/service/phoneNumber"
import type {
  UsAppToPersonInstance,
} from "twilio/lib/rest/messaging/v1/service/usAppToPerson"
import type {
  CustomerProfilesInstance,
} from "twilio/lib/rest/trusthub/v1/customerProfiles"
import type {
  CustomerProfilesChannelEndpointAssignmentInstance,
} from "twilio/lib/rest/trusthub/v1/customerProfiles/customerProfilesChannelEndpointAssignment"
import type {
  TrustProductsInstance,
} from "twilio/lib/rest/trusthub/v1/trustProducts"
import type {
  TrustProductsChannelEndpointAssignmentInstance,
} from "twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment"

// TYPES

export type IBizContactPosition =
  | "CEO"
  | "CFO"
  | "Director"
  | "General Counsel"
  | "GM"
  | "Other"
  | "VP"

export type IBizGovtIdType =
  | "ACN" // Australia
  | "CBN" // Canada
  | "CIN" // India
  | "CN" // Great Britain
  | "EIN" // USA
  | "Other"
  | "RN" // Israel
  | "VAT" // Estonia
  | "VATRN" // Romania

export type IBizIdentity =
  | "direct_customer"
  | "isv_reseller_or_partner"
  | "unknown"

export type IBizIndustry =
  | "AUTOMOTIVE"
  | "AGRICULTURE"
  | "BANKING"
  | "CONSUMER"
  | "EDUCATION"
  | "ENGINEERING"
  | "ENERGY"
  | "OIL_AND_GAS"
  | "FAST_MOVING_CONSUMER_GOODS"
  | "FINANCIAL"
  | "FINTECH"
  | "FOOD_AND_BEVERAGE"
  | "GOVERNMENT"
  | "HEALTHCARE"
  | "HOSPITALITY"
  | "INSURANCE"
  | "LEGAL"
  | "MANUFACTURING"
  | "MEDIA"
  | "ONLINE"
  | "RAW_MATERIALS"
  | "REAL_ESTATE"
  | "RELIGION"
  | "RETAIL"
  | "JEWELRY"
  | "TECHNOLOGY"
  | "TELECOMMUNICATIONS"
  | "TRANSPORTATION"
  | "TRAVEL"
  | "ELECTRONICS"
  | "NOT_FOR_PROFIT"

export type IBizRegion =
  | "AFRICA"
  | "ASIA"
  | "EUROPE"
  | "LATIN_AMERICA"
  | "USA_AND_CANADA"
  | "AUSTRALIA"

export type IBizType =
  | "Sole Proprietorship"
  | "Partnership"
  | "Limited Liability Corporation"
  | "Co-operative"
  | "Non-profit Corporation"
  | "Corporation"

export type IMessageServiceUseCase =
  | "notifications"
  | "marketing"
  | "verification"

type IAuthProps = {
  accountSid: string,
  authToken: string,
}

type ICallerID = {
  city: string,
  country: string,
  friendlyName: string,
  phoneNumber: number,
  postalCode: string,
  region: string,
}

type IPhoneNumber = ICallerID & {
  faxEnabled: boolean,
  smsEnabled: boolean,
  voiceEnabled: boolean,
}

type IGetIceTurnCredentialsProps = IAuthProps & {
}

type IExistingNumbersProps = IAuthProps & {
  phoneNumber?: number,
}

type IPhoneNumbersByAreacodeProps = IAuthProps & {
  /**
   * Ideally 3 digits, eg: `619`
   */
  areaCode: number,
  /**
   * Eg. `US` `MX`
   */
  isoCountry: string,
  twilioProps?: LocalListInstanceOptions,
}

type IBuyPhoneNumberProps = IAuthProps & {
  friendlyName: string,
  /**
   * With country code as prefix. eg:
   *
   * `16191231234` (USA)
   *
   * `526641231234` (MEX)
   */
  phoneNumber: number,
  trunkSid: string,
  twilioProps?: IncomingPhoneNumberListInstanceCreateOptions,
}

type IGetCallLogsProps = IAuthProps & {
  twilioProps?: CallListInstancePageOptions,
}

type IGetCallLogsByPageProps = IAuthProps & {
  pageUrl: string,
}

type IGetRecordingProps = IAuthProps & {
  callSid: string,
} //

type ICreateSubAccountProps = IAuthProps & {
  friendlyName: string,
}

type ICreateSipTrunkProps = IAuthProps & {
  controlListFriendlyName?: string,
  friendlyName: string,
  pbxServerFriendlyName?: string,
  pbxServerIpAddress: string,
  recordingMode:
    | "do-not-record"
    | "record-from-answer"
    | "record-from-ringing",
  sipCredential: {
    friendlyName?: string,
    password: string,
    username: string,
  },
  /**
   * In following format `sip:pbx.echo-next.com`
   */
  sipUrl: string,
  /**
   * As in `[subDomain].pstn.twilio.com`
   */
  subDomain: string,
}

export type ISendMessageProps = IAuthProps & {
  body: string,
  /**
   * With country code as prefix. eg:
   *
   * `16191231234` (USA)
   *
   * `526641231234` (MEX)
   */
  from: number,
  messagingServiceSid?: string,
  /**
   * With country code as prefix. eg:
   *
   * `16191231234` (USA)
   *
   * `526641231234` (MEX)
   */
  to: number,
  type?:
    | "sms"
    | "whatsapp",
}

type ICreateMessageServiceProps = IAuthProps & {
  friendlyName: string,
  inboundRequestUrl: string,
  useCase: IMessageServiceUseCase,
}

type ICreateBrandRegistrationProps = IAuthProps & {
  bizProfileSid: string,
  emailForStatus: string,
  friendlyName: string,
}

type ICreateA2PCampaignProps = IAuthProps & {
  brandRegistrationSid: string,
  messagingServiceSid: string,
}

type IAddPhoneNumberToMsgServiceProps = IAuthProps & {
  messagingServiceSid: string,
  phoneNumberSid: string,
}

type ICreateExternalCampaignProps = IAuthProps & {
  messagingServiceSid: string,
  preRegisteredCampaignId: string,
}

type ICreateSubBizShkStirProps = IAuthProps & {
  bizProfileSid: string,
  emailForStatus: string,
  friendlyName: string,
}

type IAddPhoneNumberToShkStirProps = IAuthProps & {
  phoneNumberSid: string,
  shkStirSid: string,
}

type ICreateSubBizProfileProps = IAuthProps & {
  contactFirstName: string,
  contactLastName: string,
  contactEmail: string,
  contactTitle: string,
  contactPosition: IBizContactPosition,
  /**
   * With country code as prefix. eg:
   *
   * `16191231234` (USA)
   *
   * `526641231234` (MEX)
   */
  contactPhoneNumber: number,
  /**
   * Could be set to `"twilio+status@echonext.com"`
   */
  emailForStatus: string,
  govtId: string,
  /**
   * `ACN` = Australia
   *
   * `CBN` = Canada
   *
   * `CIN` = India
   *
   * `CN` = Great Britain
   *
   * `EIN` = USA
   *
   * `Other` = Cases such as Mexico = RFC. Which will need to set the `govtOtherIdTypeName`
   *
   * `RN` = Israel
   *
   * `VAT` = Estonia
   *
   * `VATRN` = Romania
   */
  govtIdType: IBizGovtIdType,
  govtOtherIdTypeName?: string,
  identity: IBizIdentity,
  industry: IBizIndustry,
  name: string,
  primaryBizProfileSid: string,
  region: IBizRegion,
  type: IBizType,
  websiteDomain: string,
}

type IAddPhoneNumberToBizProfileProps = IAuthProps & {
  bizProfileSid: string,
  phoneNumberSid: string,
}

type ICreateSubBizCNamProps = IAuthProps & {
  bizProfileSid: string,
  cNam: string,
  emailForStatus: string,
}

type IAddPhoneNumberToCNAMProps = IAuthProps & {
  cNamSid: string,
  phoneNumberSid: string,
}

// ENUMS

// CONSTANTS

// HELPER METHODS

export const GetIceTurnCredentials = withAsyncTryCatch(async ({
  accountSid,
  authToken,
}: IGetIceTurnCredentialsProps): Promise<ApiV2010AccountTokenIceServers[]> => {
  const twilio = Twilio(accountSid, authToken)
  const tokens = await twilio.tokens.create()

  return tokens.iceServers
})

export const GetExistingNumbers = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  phoneNumber,
}: IExistingNumbersProps): Promise<IPhoneNumber[]> => {
  const twilio = Twilio(accountSid, authToken)
  const phoneNumbers = await twilio.incomingPhoneNumbers.list(!phoneNumber ? {
    pageSize: 1000,
  } : {
    pageSize: 100,
    phoneNumber: String(phoneNumber),
  })

  return phoneNumbers
    .map( (obj) => ({
      city: "",
      country: "",
      faxEnabled: obj.capabilities.fax,
      friendlyName: obj.friendlyName,
      phoneNumber: parseInt(obj.phoneNumber.replace("+", ""), 10),
      postalCode: "",
      region: "",
      smsEnabled: obj.capabilities.sms,
      voiceEnabled: obj.capabilities.voice,
    }) )
})

export const GetVerifiedCallerIDs = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  phoneNumber,
}: IExistingNumbersProps): Promise<ICallerID[]> => {
  const twilio = Twilio(accountSid, authToken)
  const phoneNumbers = await twilio.outgoingCallerIds.list(!phoneNumber ? {
    pageSize: 1000,
  } : {
    pageSize: 100,
    phoneNumber: String(phoneNumber),
  })

  return phoneNumbers
    .map( (obj) => ({
      city: "",
      country: "",
      friendlyName: obj.friendlyName,
      phoneNumber: parseInt(obj.phoneNumber.replace("+", ""), 10),
      postalCode: "",
      region: "",
    }) )
})

export const GetPhoneNumbersByAreacode = withAsyncTryCatch(async ({
  accountSid,
  areaCode,
  authToken,
  isoCountry,
  twilioProps,
}: IPhoneNumbersByAreacodeProps): Promise<IPhoneNumber[]> => {
  const twilio = Twilio(accountSid, authToken)
  const phoneNumbers = await twilio
    .availablePhoneNumbers(isoCountry)
    .local
    .list(isoCountry === "US" ? {
      ...twilioProps,
      areaCode,
      pageSize: 100,
    } : {
      ...twilioProps,
      contains: `${areaCode}*******`,
      pageSize: 100,
    })

  return phoneNumbers
    .map( (obj) => ({
      city: obj.rateCenter,
      country: obj.isoCountry,
      faxEnabled: obj.capabilities.fax,
      friendlyName: obj.friendlyName,
      phoneNumber: parseInt(obj.phoneNumber.replace("+", ""), 10),
      postalCode: obj.postalCode,
      region: obj.region,
      smsEnabled: obj.capabilities.sms,
      voiceEnabled: obj.capabilities.voice,
    }) )
})

/**
 * Would be nice if you call `GetExistingNumbers` to check if already exists, since this function does not check.
 * @returns The new SID for this Phone Number.
 */
export const BuyPhoneNumber = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  friendlyName,
  phoneNumber,
  trunkSid,
  twilioProps,
}: IBuyPhoneNumberProps): Promise<string> => {
  const twilio = Twilio(accountSid, authToken)
  const createdNumber = await twilio.incomingPhoneNumbers.create({
    ...twilioProps,
    friendlyName,
    phoneNumber: `+${phoneNumber}`,
    trunkSid,
  })

  return createdNumber.sid
})

export const GetCallLogs = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  twilioProps,
}: IGetCallLogsProps): Promise<{ calls: CallInstance[], nextPageUrl?: string }> => {
  const twilio = Twilio(accountSid, authToken)
  const calls = await twilio.calls.page(twilioProps as undefined)

  return {
    calls: calls.instances,
    nextPageUrl: calls.nextPageUrl,
  }
})

export const GetCallLogsByPage = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  pageUrl,
}: IGetCallLogsByPageProps): Promise<{ calls: CallInstance[], nextPageUrl?: string }> => {
  const twilio = Twilio(accountSid, authToken)
  const calls = await twilio.calls.getPage(pageUrl)

  return {
    calls: calls.instances,
    nextPageUrl: calls.nextPageUrl,
  }
}) //

export const GetRecording = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  callSid,
}: IGetRecordingProps): Promise<string|null> => {
  const twilio = Twilio(accountSid, authToken)
  const call = twilio.calls(callSid)
  const rec = await call.recordings.list()

  return rec[0]?.uri || null
}) //

export const CreateSubAccount = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  friendlyName,
}: ICreateSubAccountProps): Promise<{ authToken: string, sid: string }> => {
  const twilio = Twilio(accountSid, authToken)

  const newSubAccount = await twilio.api.accounts.create({
    friendlyName,
  })

  return {
    authToken: newSubAccount.authToken,
    sid: newSubAccount.sid,
  }
})

export const CreateSipTrunk = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  controlListFriendlyName = "Allowed to make calls",
  friendlyName,
  pbxServerFriendlyName = "echonext PBX server",
  pbxServerIpAddress,
  recordingMode,
  sipCredential: {
    friendlyName: sipCredentialFriendlyName = "echonext FS SIP credentials",
    password,
    username,
  },
  sipUrl,
  subDomain,
}: ICreateSipTrunkProps): Promise<{ sid: string }> => {
  const twilio = Twilio(accountSid, authToken)

  const newControlList = await twilio.sip.ipAccessControlLists.create({
    friendlyName: controlListFriendlyName,
  })

  await newControlList.ipAddresses().create({
    cidrPrefixLength: 32,
    friendlyName: pbxServerFriendlyName,
    ipAddress: pbxServerIpAddress,
  })

  const newCredentialList = await twilio.sip.credentialLists.create({
    friendlyName: sipCredentialFriendlyName,
  })

  await newCredentialList.credentials().create({
    password,
    username,
  })

  const newTrunk = await twilio.trunking.trunks.create({
    friendlyName,
    domainName: `${subDomain}.pstn.twilio.com`,
  })

  await newTrunk.ipAccessControlLists().create({
    ipAccessControlListSid: newControlList.sid,
  })

  await newTrunk.credentialsLists().create({
    credentialListSid: newCredentialList.sid,
  })

  await newTrunk.originationUrls().create({
    enabled: true,
    friendlyName: "",
    priority: 10,
    sipUrl,
    weight: 10,
  })

  newTrunk.recording = recordingMode
  await newTrunk.update()

  return {
    sid: newTrunk.sid,
  }
})

export const SendMessage = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  body,
  from,
  messagingServiceSid,
  to,
  type,
}: ISendMessageProps): Promise<MessageInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newMessage = await twilio.messages.create({
    body,
    messagingServiceSid,
    from: messagingServiceSid ? undefined : (type === "whatsapp"
      ? `whatsapp:+${from}`
      : `+${from}`),
    to: type === "whatsapp"
      ? `whatsapp:+${to}`
      : `+${to}`,
  })

  return newMessage
})

export const CreateMessageService = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  friendlyName,
  inboundRequestUrl,
  useCase,
}: ICreateMessageServiceProps): Promise<ServiceInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newMsgService = await twilio
    .messaging
    .v1
    .services
    .create({
      friendlyName,
      areaCodeGeomatch: true,
      inboundRequestUrl,
      smartEncoding: true,
      stickySender: true,
      usecase: useCase,
    })

  return newMsgService
})

export const CreateBrandRegistration = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  bizProfileSid,
  emailForStatus,
  friendlyName,
}: ICreateBrandRegistrationProps): Promise<BrandRegistrationInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const a2PProfileBundle = await twilio
    .trusthub
    .v1
    .trustProducts
    .create({
      email: emailForStatus,
      friendlyName,
      policySid: "RNb0d4771c2c98518d916a3d4cd70a8f8b", // A2P Messaging Bundle. Hard-coded by Twilio.
    })

  const endUser = await twilio
    .trusthub
    .v1
    .endUsers
    .create({
      attributes: {
        company_type: "private",
      },
      friendlyName: `A2P end-user for ${friendlyName}`,
      type: "us_a2p_messaging_profile_information",
    })

  const a2PProfileBundleAssignments = a2PProfileBundle.trustProductsEntityAssignments()

  await a2PProfileBundleAssignments
    .create({
      objectSid: endUser.sid,
    })

  await a2PProfileBundleAssignments
    .create({
      objectSid: bizProfileSid,
    })

  await a2PProfileBundle.update({
    status: "pending-review",
  })

  const newBrand = await twilio
    .messaging
    .v1
    .brandRegistrations
    .create({
      a2PProfileBundleSid: a2PProfileBundle.sid,
      customerProfileBundleSid: bizProfileSid,
      skipAutomaticSecVet: true,
      /*
      brandType: "SOLE_PROPRIETOR",
      */
    })

  return newBrand
})

export const CreateA2PCampaign = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  brandRegistrationSid,
  messagingServiceSid,
}: ICreateA2PCampaignProps): Promise<UsAppToPersonInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newCampaign = await twilio
    .messaging
    .v1
    .services(messagingServiceSid)
    .usAppToPerson
    .create({
      brandRegistrationSid,
      description: "This campaign sends one-time passcodes to the end users when they try to log into our company's website.",
      hasEmbeddedLinks: false,
      hasEmbeddedPhone: false,
      messageFlow: "End users opt-in by signing up to our website",
      messageSamples: [
        "Your one-time passcode is 123456.",
        "Your recovery passcode is 123456.",
      ],
      usAppToPersonUsecase: "LOW_VOLUME",
    })

  return newCampaign
})

export const AddPhoneNumberToMsgService = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  messagingServiceSid,
  phoneNumberSid,
}: IAddPhoneNumberToMsgServiceProps): Promise<PhoneNumberInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const addedPhoneNumber = await twilio
    .messaging
    .v1
    .services(messagingServiceSid)
    .phoneNumbers
    .create({
      phoneNumberSid,
    })

  return addedPhoneNumber
})

/**
 * @deprecated Has not been tested. Use `CreateA2PCampaign` instead.
 */
export const CreateExternalCampaign = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  messagingServiceSid,
  preRegisteredCampaignId,
}: ICreateExternalCampaignProps): Promise<ExternalCampaignInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newMsgCamp = await twilio
    .messaging
    .v1
    .externalCampaign
    .create({
      campaignId: preRegisteredCampaignId,
      messagingServiceSid,
    })

  return newMsgCamp
})

export const CreateSubBizShkStir = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  bizProfileSid,
  emailForStatus,
  friendlyName,
}: ICreateSubBizShkStirProps): Promise<TrustProductsInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newShkStir = await twilio
    .trusthub
    .v1
    .trustProducts
    .create({
      email: emailForStatus, // twilio+status@echonext.com
      friendlyName,
      policySid: "RN7a97559effdf62d00f4298208492a5ea", // Hard-coded by Twilio.
    })

  await newShkStir
    .trustProductsEntityAssignments()
    .create({
      objectSid: bizProfileSid,
    })

  newShkStir.update({
    status: "pending-review",
  })

  return newShkStir
})

export const AddPhoneNumberToShkStir = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  phoneNumberSid,
  shkStirSid,
}: IAddPhoneNumberToShkStirProps): Promise<TrustProductsChannelEndpointAssignmentInstance> => {
  const twilio = Twilio(accountSid, authToken)

  /**
   * @ToDo We need to remove `phoneNumberSid` from pre-existing Shk/Stirs
   */

  const newEndpoint = await twilio
    .trusthub
    .v1
    .trustProducts(shkStirSid)
    .trustProductsChannelEndpointAssignment
    .create({
      channelEndpointSid: phoneNumberSid,
      channelEndpointType: "phone-number",
    })

  return newEndpoint
})

export const CreateSubBizProfile = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  contactEmail,
  contactFirstName,
  contactLastName,
  contactPhoneNumber,
  contactPosition,
  contactTitle,
  emailForStatus,
  govtId,
  govtIdType,
  identity,
  industry,
  name,
  primaryBizProfileSid,
  region,
  type,
  websiteDomain,
  govtOtherIdTypeName,
}: ICreateSubBizProfileProps): Promise<CustomerProfilesInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const accountAddresses = await twilio
    .addresses.list({
      limit: 1,
    })

  const newBizProfile = await twilio
    .trusthub
    .v1
    .customerProfiles
    .create({
      email: emailForStatus, // twilio+status@echonext.com
      friendlyName: name,
      policySid: "RNdfbf3fae0e1107f8aded0e7cead80bf5", // Hard-coded by Twilio.
    })

  const bizInfo = await twilio
    .trusthub
    .v1
    .endUsers
    .create({
      attributes: {
        business_name: name,
        social_media_profile_urls: "",
        website_url: websiteDomain,
        business_regions_of_operation: region,
        business_type: type,
        business_registration_identifier: govtIdType,
        business_identity: identity,
        business_industry: industry,
        business_registration_number: govtId,
      },
      friendlyName: `biz info for ${name}`,
      type: "customer_profile_business_information",
    })

  const bizContact = await twilio
    .trusthub
    .v1
    .endUsers
    .create({
      attributes: {
        job_position: contactPosition,
        last_name: contactLastName,
        phone_number: `+${contactPhoneNumber}`,
        first_name: contactFirstName,
        email: contactEmail,
        business_title: contactTitle,
      },
      friendlyName: `contact info for ${name}`,
      type: "authorized_representative_1",
    })

  const supportingDoc = await twilio
    .trusthub
    .v1
    .supportingDocuments
    .create({
      attributes: !accountAddresses.length ? undefined : {
        address_sids: accountAddresses[0].sid,
      },
      friendlyName: `supporting doc for ${name}`,
      type: "customer_profile_address",
    })

  const bizProfileAssignments = newBizProfile.customerProfilesEntityAssignments()

  await bizProfileAssignments
    .create({
      objectSid: bizInfo.sid,
    })

  await bizProfileAssignments
    .create({
      objectSid: bizContact.sid,
    })

  await bizProfileAssignments
    .create({
      objectSid: supportingDoc.sid,
    })

  await bizProfileAssignments
    .create({
      objectSid: primaryBizProfileSid,
    })

  await newBizProfile
    .customerProfilesEvaluations()
    .create({
      policySid: "RNdfbf3fae0e1107f8aded0e7cead80bf5", // Hard-coded by Twilio.
    })

  await newBizProfile.update({
    status: "pending-review",
  })

  return newBizProfile
})

export const AddPhoneNumberToBizProfile = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  bizProfileSid,
  phoneNumberSid,
}: IAddPhoneNumberToBizProfileProps): Promise<CustomerProfilesChannelEndpointAssignmentInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newEndpoint = await twilio
    .trusthub
    .v1
    .customerProfiles(bizProfileSid)
    .customerProfilesChannelEndpointAssignment
    .create({
      channelEndpointSid: phoneNumberSid,
      channelEndpointType: "phone-number",
    })

  return newEndpoint
})

export const CreateSubBizCNam = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  bizProfileSid,
  cNam,
  emailForStatus,
}: ICreateSubBizCNamProps): Promise<TrustProductsInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newCNAM = await twilio
    .trusthub
    .v1
    .trustProducts
    .create({
      email: emailForStatus, // twilio+status@echonext.com
      friendlyName: `${cNam} - CNAM`,
      policySid: "RNf3db3cd1fe25fcfd3c3ded065c8fea53", // Hard-coded by Twilio.
    })

  const endUser = await twilio
    .trusthub
    .v1
    .endUsers
    .create({
      attributes: {
        cnam_display_name: cNam,
      },
      friendlyName: `${cNam} - CNAM info`,
      type: "cnam_information",
    })

  const cNamAssignments = newCNAM.trustProductsEntityAssignments()

  await cNamAssignments
    .create({
      objectSid: bizProfileSid,
    })

  await cNamAssignments
    .create({
      objectSid: endUser.sid,
    })

  await newCNAM.update({
    status: "pending-review",
  })

  return newCNAM
})

export const AddPhoneNumberToCNAM = withAsyncTryCatch(async ({
  accountSid,
  authToken,
  cNamSid,
  phoneNumberSid,
}: IAddPhoneNumberToCNAMProps): Promise<TrustProductsChannelEndpointAssignmentInstance> => {
  const twilio = Twilio(accountSid, authToken)

  const newEndpoint = await twilio
    .trusthub
    .v1
    .trustProducts(cNamSid)
    .trustProductsChannelEndpointAssignment
    .create({
      channelEndpointSid: phoneNumberSid,
      channelEndpointType: "phone-number",
    })

  return newEndpoint
})
