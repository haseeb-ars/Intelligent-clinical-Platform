/**
 * PharmaCare AI — All conditions with 8-10 branching clinical questions each.
 * Includes 7 NHS Pharmacy First conditions + additional pharmacy services.
 */

export const conditions = [
    // ── NHS Pharmacy First Conditions ──────────────────────────────
    {
        id: 'earache',
        name: 'Earache',
        description: 'Pain or discomfort in one or both ears, including aching, sharp or burning sensations',
        icon: '👂',
        category: 'NHS Pharmacy First',
        color: '#00A9CE',
        gradient: 'linear-gradient(135deg, #00A9CE 0%, #0077B6 100%)',
        questions: [
            {
                id: 'ear_duration',
                text: 'How long have you been experiencing ear pain?',
                type: 'single',
                options: ['Less than 24 hours', '1–3 days', '4–7 days', 'More than 7 days']
            },
            {
                id: 'ear_side',
                text: 'Which ear is affected?',
                type: 'single',
                options: ['Left ear only', 'Right ear only', 'Both ears']
            },
            {
                id: 'ear_severity',
                text: 'How would you rate the pain severity?',
                type: 'single',
                options: ['Mild — noticeable but not bothersome', 'Moderate — affects daily activities', 'Severe — very painful and distressing', 'Excruciating — worst pain experienced']
            },
            {
                id: 'ear_symptoms',
                text: 'Are you experiencing any of the following symptoms?',
                type: 'multi',
                options: ['Discharge or fluid from the ear', 'Reduced hearing', 'Ringing or buzzing (tinnitus)', 'Dizziness or balance problems', 'Itchiness in the ear canal', 'Feeling of fullness or pressure', 'None of the above']
            },
            {
                id: 'ear_fever',
                text: 'Do you currently have a fever or elevated temperature?',
                type: 'single',
                options: ['No', 'Mild fever (37.5–38°C)', 'High fever (above 38°C)', 'Not sure']
            },
            {
                id: 'ear_recent',
                text: 'Have you had any of the following recently?',
                type: 'multi',
                options: ['Cold or upper respiratory infection', 'Swimming or water exposure', 'Air travel in the past week', 'Use of cotton buds or ear cleaning', 'Ear injury or trauma', 'None of the above']
            },
            {
                id: 'ear_previous',
                text: 'Have you had ear infections or ear problems before?',
                type: 'single',
                options: ['No, this is the first time', 'Yes, occasionally', 'Yes, I get them frequently', 'Yes, I have a chronic ear condition']
            },
            {
                id: 'ear_medications',
                text: 'Have you taken any medication for this?',
                type: 'multi',
                options: ['Paracetamol', 'Ibuprofen', 'Ear drops (over-the-counter)', 'Prescribed antibiotics', 'No medication taken', 'Other']
            },
            {
                id: 'ear_swelling',
                text: 'Is there any swelling or redness around or behind the ear?',
                type: 'single',
                options: ['No', 'Mild redness', 'Noticeable swelling', 'Significant swelling with tenderness']
            },
            {
                id: 'ear_impact',
                text: 'How is it affecting your daily life?',
                type: 'single',
                options: ['Minimal impact', 'Some difficulty sleeping', 'Difficulty concentrating at work/school', 'Unable to perform normal activities']
            }
        ]
    },
    {
        id: 'sore-throat',
        name: 'Sore Throat',
        description: 'Pain, scratchiness or irritation of the throat that often worsens when swallowing',
        icon: '🗣️',
        category: 'NHS Pharmacy First',
        color: '#E8573A',
        gradient: 'linear-gradient(135deg, #E8573A 0%, #C0392B 100%)',
        questions: [
            {
                id: 'throat_duration',
                text: 'How long have you had a sore throat?',
                type: 'single',
                options: ['Less than 24 hours', '1–3 days', '4–7 days', 'More than 7 days']
            },
            {
                id: 'throat_severity',
                text: 'How severe is your sore throat?',
                type: 'single',
                options: ['Mild — slightly uncomfortable', 'Moderate — noticeably painful', 'Severe — very painful when swallowing', 'Cannot swallow at all']
            },
            {
                id: 'throat_symptoms',
                text: 'Which additional symptoms are you experiencing?',
                type: 'multi',
                options: ['Difficulty swallowing', 'Swollen glands in the neck', 'White patches on tonsils', 'Hoarse or lost voice', 'Cough', 'Runny nose', 'Headache', 'None of the above']
            },
            {
                id: 'throat_fever',
                text: 'Do you have a fever?',
                type: 'single',
                options: ['No fever', 'Mild fever (37.5–38°C)', 'High fever (above 38°C)', 'Not sure / haven\'t checked']
            },
            {
                id: 'throat_breathing',
                text: 'Are you having any difficulty breathing?',
                type: 'single',
                options: ['No difficulty', 'Slightly harder to breathe than normal', 'Noticeable breathing difficulty', 'Severe difficulty — struggling to breathe']
            },
            {
                id: 'throat_eating',
                text: 'Are you able to eat and drink normally?',
                type: 'single',
                options: ['Yes, no problems', 'Some discomfort when swallowing', 'Can only manage soft foods and liquids', 'Unable to swallow fluids']
            },
            {
                id: 'throat_rash',
                text: 'Do you have a rash anywhere on your body?',
                type: 'single',
                options: ['No rash', 'Yes, on my chest or torso', 'Yes, on my arms or legs', 'Yes, widespread rash']
            },
            {
                id: 'throat_contacts',
                text: 'Has anyone close to you had similar symptoms recently?',
                type: 'single',
                options: ['No', 'Yes, a family member', 'Yes, a colleague or classmate', 'Yes, multiple people around me']
            },
            {
                id: 'throat_recurrence',
                text: 'How often do you get sore throats?',
                type: 'single',
                options: ['Rarely — this is unusual', 'A few times a year', 'Monthly or more often', 'I have a chronic sore throat']
            },
            {
                id: 'throat_treatment',
                text: 'What have you tried so far?',
                type: 'multi',
                options: ['Paracetamol', 'Ibuprofen', 'Throat lozenges', 'Salt water gargle', 'Throat spray', 'Nothing yet', 'Other']
            }
        ]
    },
    {
        id: 'sinusitis',
        name: 'Sinusitis',
        description: 'Inflammation or swelling of the tissue lining the sinuses causing congestion and facial pain',
        icon: '🤧',
        category: 'NHS Pharmacy First',
        color: '#5B8C5A',
        gradient: 'linear-gradient(135deg, #5B8C5A 0%, #3D6B3D 100%)',
        questions: [
            {
                id: 'sinus_duration',
                text: 'How long have you had sinus symptoms?',
                type: 'single',
                options: ['Less than 7 days', '1–4 weeks', '4–12 weeks', 'More than 12 weeks']
            },
            {
                id: 'sinus_symptoms',
                text: 'Which symptoms are you experiencing?',
                type: 'multi',
                options: ['Blocked or stuffy nose', 'Green or yellow nasal discharge', 'Facial pain or pressure', 'Reduced sense of smell', 'Headache', 'Post-nasal drip', 'Cough', 'None of the above']
            },
            {
                id: 'sinus_pain_location',
                text: 'Where is your facial pain or pressure most noticeable?',
                type: 'single',
                options: ['Forehead', 'Around the eyes', 'Cheeks', 'Upper teeth or jaw', 'Multiple areas', 'No facial pain']
            },
            {
                id: 'sinus_severity',
                text: 'How severe are your symptoms overall?',
                type: 'single',
                options: ['Mild — manageable', 'Moderate — uncomfortable but functional', 'Severe — significantly affecting daily life', 'Very severe — unable to function normally']
            },
            {
                id: 'sinus_fever',
                text: 'Do you have a fever?',
                type: 'single',
                options: ['No', 'Mild (37.5–38°C)', 'High (above 38°C)', 'Unsure']
            },
            {
                id: 'sinus_vision',
                text: 'Have you noticed any changes to your vision?',
                type: 'single',
                options: ['No changes', 'Slightly blurred', 'Double vision', 'Swelling around the eye']
            },
            {
                id: 'sinus_history',
                text: 'Do you have a history of sinus problems?',
                type: 'single',
                options: ['No, first time', 'Occasional sinus issues', 'Recurrent sinusitis', 'Chronic sinusitis diagnosed']
            },
            {
                id: 'sinus_allergies',
                text: 'Do you have any known allergies?',
                type: 'multi',
                options: ['Hay fever / seasonal allergies', 'Dust mites', 'Pet allergies', 'No known allergies', 'Other allergies']
            },
            {
                id: 'sinus_treatment',
                text: 'What treatments have you tried?',
                type: 'multi',
                options: ['Nasal decongestant spray', 'Steam inhalation', 'Paracetamol or ibuprofen', 'Saline nasal rinse', 'Antihistamines', 'Nothing yet', 'Other']
            }
        ]
    },
    {
        id: 'conjunctivitis',
        name: 'Infected Eye',
        description: 'Redness, irritation, discharge or itchiness affecting one or both eyes (conjunctivitis)',
        icon: '👁️',
        category: 'NHS Pharmacy First',
        color: '#D4A843',
        gradient: 'linear-gradient(135deg, #D4A843 0%, #B8860B 100%)',
        questions: [
            {
                id: 'eye_duration',
                text: 'How long have you had eye symptoms?',
                type: 'single',
                options: ['Less than 24 hours', '1–3 days', '4–7 days', 'More than 7 days']
            },
            {
                id: 'eye_affected',
                text: 'Which eye is affected?',
                type: 'single',
                options: ['Left eye only', 'Right eye only', 'Both eyes']
            },
            {
                id: 'eye_symptoms',
                text: 'What symptoms are you experiencing?',
                type: 'multi',
                options: ['Redness', 'Itchiness', 'Watery discharge', 'Sticky or crusty discharge', 'Green or yellow pus', 'Eyelids stuck together (morning)', 'Gritty feeling', 'Sensitivity to light', 'None of the above']
            },
            {
                id: 'eye_vision',
                text: 'Has your vision been affected?',
                type: 'single',
                options: ['No change in vision', 'Slightly blurred (clears when blinking)', 'Noticeably blurred', 'Significant vision reduction']
            },
            {
                id: 'eye_pain',
                text: 'Are you experiencing eye pain?',
                type: 'single',
                options: ['No pain', 'Mild discomfort', 'Moderate pain', 'Severe pain']
            },
            {
                id: 'eye_contacts_lenses',
                text: 'Do you wear contact lenses?',
                type: 'single',
                options: ['No', 'Yes, daily disposables', 'Yes, monthly lenses', 'Yes, but stopped wearing them due to symptoms']
            },
            {
                id: 'eye_recent_exposure',
                text: 'Have you been exposed to any of the following?',
                type: 'multi',
                options: ['Someone with an eye infection', 'Swimming (pool or open water)', 'Chemicals or irritants', 'New makeup or eye products', 'Dusty or windy environment', 'None of the above']
            },
            {
                id: 'eye_hay_fever',
                text: 'Do you suffer from hay fever or allergies?',
                type: 'single',
                options: ['No', 'Yes, seasonal', 'Yes, year-round', 'Not sure']
            },
            {
                id: 'eye_treatment',
                text: 'Have you used any eye treatments?',
                type: 'multi',
                options: ['Eye drops (over-the-counter)', 'Antihistamine eye drops', 'Warm compress', 'Eye bath / clean with water', 'Prescribed treatment', 'Nothing yet']
            },
            {
                id: 'eye_previous',
                text: 'Have you had conjunctivitis or eye infections before?',
                type: 'single',
                options: ['No, first time', 'Yes, once or twice', 'Yes, it recurs regularly', 'Yes, I have an ongoing eye condition']
            }
        ]
    },
    {
        id: 'uti',
        name: 'UTI',
        description: 'Pain, burning or discomfort when urinating, with increased frequency or urgency',
        icon: '💧',
        category: 'NHS Pharmacy First',
        color: '#7B68EE',
        gradient: 'linear-gradient(135deg, #7B68EE 0%, #5B4FCF 100%)',
        questions: [
            {
                id: 'uti_duration',
                text: 'How long have you had urinary symptoms?',
                type: 'single',
                options: ['Less than 24 hours', '1–3 days', '4–7 days', 'More than 7 days']
            },
            {
                id: 'uti_symptoms',
                text: 'Which symptoms are you experiencing?',
                type: 'multi',
                options: ['Burning or stinging when urinating', 'Needing to urinate more frequently', 'Urgency — sudden need to urinate', 'Cloudy or dark urine', 'Strong-smelling urine', 'Blood in urine', 'Lower abdominal pain or pressure', 'None of the above']
            },
            {
                id: 'uti_severity',
                text: 'How severe are your symptoms?',
                type: 'single',
                options: ['Mild — noticeable but manageable', 'Moderate — uncomfortable', 'Severe — very painful', 'Excruciating — can barely urinate']
            },
            {
                id: 'uti_fever',
                text: 'Do you have any of the following?',
                type: 'multi',
                options: ['Fever or chills', 'Back pain (flank/kidney area)', 'Nausea or vomiting', 'Feeling generally unwell', 'None of the above']
            },
            {
                id: 'uti_gender',
                text: 'What is your biological sex?',
                type: 'single',
                options: ['Female', 'Male']
            },
            {
                id: 'uti_pregnancy',
                text: 'Are you currently pregnant or could you be?',
                type: 'single',
                options: ['No', 'Yes, currently pregnant', 'Possibly', 'Not applicable']
            },
            {
                id: 'uti_history',
                text: 'How often do you get UTIs?',
                type: 'single',
                options: ['First time', 'Rarely (once a year or less)', 'Occasionally (2–3 per year)', 'Frequently (more than 3 per year)']
            },
            {
                id: 'uti_conditions',
                text: 'Do you have any of the following conditions?',
                type: 'multi',
                options: ['Diabetes', 'Kidney problems', 'Immunosuppression', 'Catheter use', 'Recent urinary procedure', 'None of the above']
            },
            {
                id: 'uti_treatment',
                text: 'Have you taken anything for these symptoms?',
                type: 'multi',
                options: ['Paracetamol', 'Over-the-counter cystitis sachets', 'Cranberry products', 'Increased fluid intake', 'Prescribed antibiotics (current)', 'Nothing yet']
            }
        ]
    },
    {
        id: 'shingles',
        name: 'Shingles',
        description: 'A painful, blistering rash caused by reactivation of the varicella-zoster virus',
        icon: '🔴',
        category: 'NHS Pharmacy First',
        color: '#C0392B',
        gradient: 'linear-gradient(135deg, #C0392B 0%, #962D22 100%)',
        questions: [
            {
                id: 'shingles_duration',
                text: 'When did the rash first appear?',
                type: 'single',
                options: ['Today / yesterday', '2–3 days ago', '4–7 days ago', 'More than 7 days ago']
            },
            {
                id: 'shingles_rash_type',
                text: 'What does the rash look like?',
                type: 'single',
                options: ['Red patches without blisters', 'Small fluid-filled blisters', 'Blisters that have burst or are weeping', 'Crusted or scabbing over']
            },
            {
                id: 'shingles_location',
                text: 'Where on your body is the rash?',
                type: 'single',
                options: ['Chest or torso (one side)', 'Back (one side)', 'Face or forehead', 'Around the eye', 'Neck', 'Arm or leg', 'Multiple areas']
            },
            {
                id: 'shingles_pain',
                text: 'Describe the pain associated with the rash:',
                type: 'multi',
                options: ['Burning sensation', 'Stabbing or shooting pain', 'Tingling or numbness', 'Extreme sensitivity to touch', 'Constant aching', 'Itching', 'Minimal or no pain']
            },
            {
                id: 'shingles_severity',
                text: 'How severe is the pain?',
                type: 'single',
                options: ['Mild', 'Moderate', 'Severe', 'Very severe — affecting sleep and daily activities']
            },
            {
                id: 'shingles_other_symptoms',
                text: 'Do you have any other symptoms?',
                type: 'multi',
                options: ['Fever', 'Headache', 'Fatigue or tiredness', 'Muscle aches', 'Sensitivity to light', 'None of the above']
            },
            {
                id: 'shingles_chickenpox',
                text: 'Have you had chickenpox before?',
                type: 'single',
                options: ['Yes', 'No', 'Not sure']
            },
            {
                id: 'shingles_immune',
                text: 'Do you have any conditions affecting your immune system?',
                type: 'multi',
                options: ['HIV/AIDS', 'Cancer or chemotherapy', 'Taking immunosuppressive medication', 'Organ transplant recipient', 'No immune conditions', 'Other']
            },
            {
                id: 'shingles_age',
                text: 'What is your age range?',
                type: 'single',
                options: ['Under 18', '18–49', '50–69', '70 or over']
            },
            {
                id: 'shingles_treatment',
                text: 'Have you started any treatment?',
                type: 'multi',
                options: ['Paracetamol', 'Ibuprofen', 'Calamine lotion', 'Antiviral medication', 'Nothing yet', 'Other']
            }
        ]
    },
    {
        id: 'impetigo',
        name: 'Impetigo',
        description: 'A highly contagious bacterial skin infection causing sores, blisters or honey-coloured crusts',
        icon: '🩹',
        category: 'NHS Pharmacy First',
        color: '#E67E22',
        gradient: 'linear-gradient(135deg, #E67E22 0%, #CC6B1A 100%)',
        questions: [
            {
                id: 'impetigo_duration',
                text: 'How long have you had the skin sores?',
                type: 'single',
                options: ['Less than 2 days', '2–5 days', '5–7 days', 'More than 7 days']
            },
            {
                id: 'impetigo_appearance',
                text: 'What do the sores look like?',
                type: 'single',
                options: ['Red sores that burst and leave golden/honey crusts', 'Fluid-filled blisters (larger than a pea)', 'Red, inflamed patches of skin', 'Open, weeping sores']
            },
            {
                id: 'impetigo_location',
                text: 'Where are the sores?',
                type: 'multi',
                options: ['Around the nose', 'Around the mouth', 'Hands or fingers', 'Arms or legs', 'Torso', 'Widespread / multiple areas']
            },
            {
                id: 'impetigo_spreading',
                text: 'Are the sores spreading?',
                type: 'single',
                options: ['No, staying the same', 'Slowly spreading', 'Spreading quickly', 'New sores appearing in different areas']
            },
            {
                id: 'impetigo_size',
                text: 'What is the approximate total area affected?',
                type: 'single',
                options: ['Smaller than a coin', 'About the size of a palm', 'Larger than a palm', 'Multiple large areas']
            },
            {
                id: 'impetigo_symptoms',
                text: 'Are you experiencing any other symptoms?',
                type: 'multi',
                options: ['Itchiness', 'Pain or tenderness', 'Swollen lymph glands', 'Fever', 'Feeling unwell', 'None of the above']
            },
            {
                id: 'impetigo_who',
                text: 'Who is affected?',
                type: 'single',
                options: ['Child under 2 years', 'Child 2–12 years', 'Teenager (13–17)', 'Adult (18+)']
            },
            {
                id: 'impetigo_contacts',
                text: 'Has anyone else you\'re in contact with developed similar sores?',
                type: 'single',
                options: ['No', 'Yes, a family member', 'Yes, at school/nursery', 'Yes, multiple people']
            },
            {
                id: 'impetigo_conditions',
                text: 'Do you have any skin conditions or relevant medical history?',
                type: 'multi',
                options: ['Eczema', 'Diabetes', 'Weakened immune system', 'Previous impetigo episodes', 'None of the above']
            },
            {
                id: 'impetigo_treatment',
                text: 'Have you tried any treatments?',
                type: 'multi',
                options: ['Antiseptic cream', 'Antibiotic cream (over-the-counter)', 'Keeping area clean and covered', 'Prescribed treatment', 'Nothing yet']
            }
        ]
    },

    // ── Additional Pharmacy Services ───────────────────────────────
    {
        id: 'hair-loss',
        name: 'Hair Loss',
        description: 'Thinning, shedding or bald patches affecting the scalp or body — get confidential advice',
        icon: '💇',
        category: 'Pharmacy Services',
        color: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        questions: [
            {
                id: 'hair_duration',
                text: 'How long have you been noticing hair loss?',
                type: 'single',
                options: ['Less than 1 month', '1–3 months', '3–6 months', '6–12 months', 'More than 1 year']
            },
            {
                id: 'hair_pattern',
                text: 'What pattern of hair loss are you experiencing?',
                type: 'single',
                options: ['Receding hairline', 'Thinning on the crown / top', 'General thinning all over', 'Circular bald patches (alopecia areata)', 'Hair coming out in clumps', 'Thinning along the parting line']
            },
            {
                id: 'hair_onset',
                text: 'How did the hair loss begin?',
                type: 'single',
                options: ['Gradual — slowly getting worse', 'Sudden — noticed a lot of hair falling out', 'After a stressful event or illness', 'After starting a new medication', 'After pregnancy or hormonal changes']
            },
            {
                id: 'hair_family',
                text: 'Is there a family history of hair loss?',
                type: 'single',
                options: ['Yes, on my father\'s side', 'Yes, on my mother\'s side', 'Yes, both sides', 'No family history', 'Not sure']
            },
            {
                id: 'hair_scalp',
                text: 'Do you have any scalp symptoms?',
                type: 'multi',
                options: ['Itchy scalp', 'Redness or inflammation', 'Flaking or dandruff', 'Pain or tenderness', 'Scarring or smooth bald patches', 'None of the above']
            },
            {
                id: 'hair_other_symptoms',
                text: 'Are you experiencing any other symptoms?',
                type: 'multi',
                options: ['Fatigue or tiredness', 'Weight changes', 'Brittle nails', 'Changes in menstrual cycle', 'Mood changes', 'None of the above']
            },
            {
                id: 'hair_age_gender',
                text: 'What is your age and gender?',
                type: 'single',
                options: ['Male, under 30', 'Male, 30–50', 'Male, over 50', 'Female, under 30', 'Female, 30–50', 'Female, over 50']
            },
            {
                id: 'hair_treatments',
                text: 'Have you tried any treatments for hair loss?',
                type: 'multi',
                options: ['Minoxidil (Regaine)', 'Finasteride (Propecia)', 'Hair supplements / biotin', 'Specialist shampoos', 'Seen a dermatologist', 'Nothing yet']
            },
            {
                id: 'hair_conditions',
                text: 'Do you have any relevant medical conditions?',
                type: 'multi',
                options: ['Thyroid condition', 'Iron deficiency / anaemia', 'Autoimmune condition', 'Polycystic ovary syndrome (PCOS)', 'None of the above']
            },
            {
                id: 'hair_impact',
                text: 'How is the hair loss affecting you?',
                type: 'single',
                options: ['Minimal concern — just curious', 'Some worry — would like advice', 'Significant concern — affecting confidence', 'Severely affecting mental wellbeing']
            }
        ]
    },
    {
        id: 'erectile-dysfunction',
        name: 'Erectile Dysfunction',
        description: 'Difficulty getting or maintaining an erection — confidential, judgement-free support',
        icon: '🩺',
        category: 'Pharmacy Services',
        color: '#2563EB',
        gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        questions: [
            {
                id: 'ed_duration',
                text: 'How long have you been experiencing difficulty with erections?',
                type: 'single',
                options: ['Less than 1 month', '1–3 months', '3–6 months', '6–12 months', 'More than 1 year']
            },
            {
                id: 'ed_frequency',
                text: 'How often do you experience erectile difficulty?',
                type: 'single',
                options: ['Occasionally — sometimes can, sometimes can\'t', 'About half the time', 'Most of the time', 'Every time']
            },
            {
                id: 'ed_type',
                text: 'Which best describes your experience?',
                type: 'single',
                options: ['Difficulty getting an erection', 'Can get an erection but it doesn\'t last', 'Reduced firmness compared to before', 'Complete inability to get an erection']
            },
            {
                id: 'ed_morning',
                text: 'Do you still get morning erections?',
                type: 'single',
                options: ['Yes, regularly', 'Sometimes', 'Rarely', 'Never']
            },
            {
                id: 'ed_health',
                text: 'Do you have any of these health conditions?',
                type: 'multi',
                options: ['High blood pressure', 'Diabetes', 'Heart disease or cardiovascular issues', 'High cholesterol', 'Prostate problems', 'Depression or anxiety', 'None of the above']
            },
            {
                id: 'ed_medications',
                text: 'Are you taking any medications?',
                type: 'multi',
                options: ['Blood pressure medication', 'Antidepressants', 'Diabetes medication', 'Heart medication (nitrates)', 'Prostate medication', 'No regular medication', 'Other']
            },
            {
                id: 'ed_lifestyle',
                text: 'Which lifestyle factors apply to you?',
                type: 'multi',
                options: ['Smoker', 'Regular alcohol use', 'Lack of exercise', 'High stress / anxiety', 'Poor sleep', 'None of the above']
            },
            {
                id: 'ed_age',
                text: 'What is your age?',
                type: 'single',
                options: ['18–30', '31–40', '41–50', '51–60', '61–70', 'Over 70']
            },
            {
                id: 'ed_previous_treatment',
                text: 'Have you tried any treatments for this?',
                type: 'multi',
                options: ['Sildenafil (Viagra)', 'Tadalafil (Cialis)', 'Herbal supplements', 'Counselling or therapy', 'Seen a GP about this', 'Nothing yet']
            },
            {
                id: 'ed_impact',
                text: 'How is this affecting your quality of life?',
                type: 'single',
                options: ['Mild impact — manageable', 'Moderate — affecting relationships', 'Significant — causing distress', 'Severe — significantly affecting wellbeing']
            }
        ]
    },
    {
        id: 'acne',
        name: 'Acne',
        description: 'Spots, blackheads, whiteheads and cysts on the face, back or chest',
        icon: '✨',
        category: 'Pharmacy Services',
        color: '#EC4899',
        gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        questions: [
            {
                id: 'acne_duration',
                text: 'How long have you had acne?',
                type: 'single',
                options: ['Less than 1 month', '1–6 months', '6–12 months', '1–3 years', 'More than 3 years']
            },
            {
                id: 'acne_type',
                text: 'What type of spots do you mainly have?',
                type: 'multi',
                options: ['Blackheads', 'Whiteheads', 'Red inflamed spots', 'Spots with pus (pustules)', 'Large painful lumps under the skin (cysts)', 'Combination of types']
            },
            {
                id: 'acne_location',
                text: 'Where is your acne mainly located?',
                type: 'multi',
                options: ['Face — forehead', 'Face — cheeks', 'Face — chin and jawline', 'Back', 'Chest', 'Shoulders']
            },
            {
                id: 'acne_severity',
                text: 'How would you describe the severity?',
                type: 'single',
                options: ['Mild — a few spots', 'Moderate — noticeable and widespread', 'Severe — many spots, cysts, or painful', 'Very severe — significant scarring or disfigurement']
            },
            {
                id: 'acne_triggers',
                text: 'What seems to make it worse?',
                type: 'multi',
                options: ['Menstrual cycle', 'Stress', 'Certain foods', 'Makeup or skincare products', 'Hot weather or sweating', 'Nothing specific', 'Not sure']
            },
            {
                id: 'acne_scarring',
                text: 'Do you have any acne scarring?',
                type: 'single',
                options: ['No scarring', 'Mild scarring', 'Moderate scarring', 'Significant scarring']
            },
            {
                id: 'acne_age_gender',
                text: 'What is your age and gender?',
                type: 'single',
                options: ['Teen (13–17)', 'Young adult (18–25)', 'Adult (26–40)', 'Over 40']
            },
            {
                id: 'acne_treatment',
                text: 'What treatments have you tried?',
                type: 'multi',
                options: ['Benzoyl peroxide', 'Salicylic acid wash', 'Over-the-counter spot treatment', 'Prescribed topical (retinoid, antibiotic)', 'Prescribed oral antibiotics', 'Oral contraceptive pill', 'Isotretinoin (Roaccutane)', 'Nothing yet']
            },
            {
                id: 'acne_skincare',
                text: 'What is your current skincare routine?',
                type: 'multi',
                options: ['Daily cleansing', 'Moisturiser', 'SPF / sunscreen', 'Exfoliation', 'No particular routine']
            },
            {
                id: 'acne_impact',
                text: 'How is acne affecting your mental health?',
                type: 'single',
                options: ['Not at all', 'Slightly self-conscious', 'Noticeably affecting confidence', 'Significantly affecting mental wellbeing']
            }
        ]
    },
    {
        id: 'acid-reflux',
        name: 'Acid Reflux',
        description: 'Heartburn, indigestion and stomach acid issues causing burning chest or throat discomfort',
        icon: '🔥',
        category: 'Pharmacy Services',
        color: '#F59E0B',
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        questions: [
            {
                id: 'reflux_duration',
                text: 'How long have you been experiencing acid reflux symptoms?',
                type: 'single',
                options: ['Less than 1 week', '1–4 weeks', '1–3 months', 'More than 3 months']
            },
            {
                id: 'reflux_symptoms',
                text: 'Which symptoms do you have?',
                type: 'multi',
                options: ['Burning sensation in the chest (heartburn)', 'Acid taste in the mouth', 'Difficulty swallowing', 'Regurgitation of food', 'Bloating', 'Nausea', 'Persistent cough', 'Sore throat']
            },
            {
                id: 'reflux_frequency',
                text: 'How often do you experience symptoms?',
                type: 'single',
                options: ['Occasionally (once a week or less)', 'Several times a week', 'Daily', 'Multiple times a day']
            },
            {
                id: 'reflux_triggers',
                text: 'What tends to trigger your symptoms?',
                type: 'multi',
                options: ['Spicy food', 'Fatty or fried food', 'Alcohol', 'Coffee or caffeinated drinks', 'Large meals', 'Lying down after eating', 'Stress', 'Not sure']
            },
            {
                id: 'reflux_severity',
                text: 'How severe are your symptoms?',
                type: 'single',
                options: ['Mild — mildly uncomfortable', 'Moderate — regularly bothersome', 'Severe — significantly painful', 'Very severe — affecting eating and sleep']
            },
            {
                id: 'reflux_alarm',
                text: 'Have you experienced any of the following?',
                type: 'multi',
                options: ['Unintended weight loss', 'Difficulty swallowing that is getting worse', 'Vomiting blood', 'Black or tarry stools', 'Severe abdominal pain', 'None of the above']
            },
            {
                id: 'reflux_medications',
                text: 'Are you taking any of these medications?',
                type: 'multi',
                options: ['NSAIDs (ibuprofen, aspirin)', 'Steroids', 'Blood pressure medication', 'Bisphosphonates (osteoporosis)', 'No relevant medications']
            },
            {
                id: 'reflux_treatment',
                text: 'What have you tried for relief?',
                type: 'multi',
                options: ['Antacids (Gaviscon, Rennie)', 'Omeprazole or lansoprazole', 'Ranitidine or famotidine', 'Dietary changes', 'Elevating the head of the bed', 'Nothing yet']
            },
            {
                id: 'reflux_lifestyle',
                text: 'Which lifestyle factors apply?',
                type: 'multi',
                options: ['Overweight', 'Smoker', 'Eat late at night', 'High stress', 'Pregnant', 'None of the above']
            }
        ]
    },
    {
        id: 'hay-fever',
        name: 'Hay Fever',
        description: 'Seasonal allergies causing sneezing, itchy eyes, runny nose and congestion',
        icon: '🌸',
        category: 'Pharmacy Services',
        color: '#10B981',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        questions: [
            {
                id: 'hay_duration',
                text: 'When do your symptoms typically occur?',
                type: 'single',
                options: ['Spring (March–May)', 'Summer (June–August)', 'Autumn (September–November)', 'All year round', 'Not sure — varies']
            },
            {
                id: 'hay_symptoms',
                text: 'Which symptoms do you experience?',
                type: 'multi',
                options: ['Sneezing', 'Runny nose', 'Blocked nose', 'Itchy, watery eyes', 'Itchy throat or palate', 'Cough', 'Headache', 'Fatigue']
            },
            {
                id: 'hay_severity',
                text: 'How severe are your symptoms?',
                type: 'single',
                options: ['Mild — slightly annoying', 'Moderate — affects daily activities', 'Severe — significantly disrupts life', 'Very severe — almost unbearable']
            },
            {
                id: 'hay_triggers',
                text: 'What are your main triggers?',
                type: 'multi',
                options: ['Grass pollen', 'Tree pollen', 'Weed pollen', 'Dust mites', 'Pet dander', 'Mould spores', 'Not sure']
            },
            {
                id: 'hay_sleep',
                text: 'Do symptoms affect your sleep?',
                type: 'single',
                options: ['No', 'Occasionally', 'Most nights during season', 'Every night']
            },
            {
                id: 'hay_asthma',
                text: 'Do you have asthma or a history of allergic conditions?',
                type: 'multi',
                options: ['Asthma', 'Eczema', 'Food allergies', 'Previous anaphylaxis', 'None of the above']
            },
            {
                id: 'hay_treatment',
                text: 'What treatments have you tried?',
                type: 'multi',
                options: ['Antihistamine tablets (cetirizine, loratadine)', 'Nasal steroid spray (Beconase, Pirinase)', 'Eye drops', 'Nasal decongestant', 'Natural remedies (local honey, etc)', 'Nothing yet']
            },
            {
                id: 'hay_effectiveness',
                text: 'How effective have treatments been?',
                type: 'single',
                options: ['Very effective — symptoms well controlled', 'Somewhat effective — still some symptoms', 'Not very effective — symptoms persist', 'Haven\'t found anything that works', 'Haven\'t tried treatment yet']
            },
            {
                id: 'hay_impact',
                text: 'How does hay fever affect your daily life?',
                type: 'single',
                options: ['Minimal impact', 'Some impact on work/school', 'Significant impact — can\'t enjoy outdoors', 'Severely limiting — affects everything']
            }
        ]
    },
    {
        id: 'period-pain',
        name: 'Period Pain',
        description: 'Menstrual cramps and discomfort — get personalised advice for better management',
        icon: '🌙',
        category: 'Pharmacy Services',
        color: '#F43F5E',
        gradient: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
        questions: [
            {
                id: 'period_severity',
                text: 'How severe is your period pain?',
                type: 'single',
                options: ['Mild — noticeable but manageable', 'Moderate — need painkillers', 'Severe — affects daily activities', 'Debilitating — unable to work or function']
            },
            {
                id: 'period_duration',
                text: 'How long does the pain usually last?',
                type: 'single',
                options: ['First day only', '1–2 days', '3–5 days', 'Throughout the entire period', 'Pain between periods too']
            },
            {
                id: 'period_symptoms',
                text: 'What other symptoms do you experience?',
                type: 'multi',
                options: ['Lower back pain', 'Bloating', 'Nausea or vomiting', 'Diarrhoea', 'Headache', 'Fatigue', 'Mood changes', 'Heavy bleeding', 'None of the above']
            },
            {
                id: 'period_cycle',
                text: 'How regular are your periods?',
                type: 'single',
                options: ['Regular (every 21–35 days)', 'Slightly irregular', 'Very irregular', 'Periods have recently changed']
            },
            {
                id: 'period_heavy',
                text: 'How would you describe your menstrual flow?',
                type: 'single',
                options: ['Light', 'Normal / moderate', 'Heavy — changing pads/tampons every 1–2 hours', 'Very heavy — with clots', 'Varies significantly']
            },
            {
                id: 'period_age',
                text: 'How old were you when periods started?',
                type: 'single',
                options: ['Under 10', '10–12', '13–15', 'Over 15']
            },
            {
                id: 'period_history',
                text: 'Has the pain pattern changed over time?',
                type: 'single',
                options: ['Always been like this since periods started', 'Got worse over time', 'Recently started being painful', 'Pain started after a pregnancy or surgery']
            },
            {
                id: 'period_conditions',
                text: 'Have you been diagnosed with any of these?',
                type: 'multi',
                options: ['Endometriosis', 'Polycystic ovary syndrome (PCOS)', 'Fibroids', 'Pelvic inflammatory disease', 'None of the above', 'Not sure']
            },
            {
                id: 'period_treatment',
                text: 'What do you currently use for pain relief?',
                type: 'multi',
                options: ['Paracetamol', 'Ibuprofen', 'Mefenamic acid (Ponstan)', 'Heat pad / hot water bottle', 'Hormonal contraception', 'TENS machine', 'Nothing — looking for advice']
            },
            {
                id: 'period_impact',
                text: 'How many days per month do you miss work/school due to period pain?',
                type: 'single',
                options: ['None', '1 day', '2–3 days', 'More than 3 days']
            }
        ]
    }
];

// Helper: get conditions by category
export const getConditionsByCategory = () => {
    const categories = {};
    conditions.forEach(c => {
        if (!categories[c.category]) categories[c.category] = [];
        categories[c.category].push(c);
    });
    return categories;
};

export default conditions;
